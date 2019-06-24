export type Ok<T> = {
  okay: T;
};

export type Err<E> = {
  error: E;
};

class Result<T, E> {
  private innerVal: Ok<T> | Err<E>;
  constructor(val: Ok<T> | Err<E>) {
    if (
      (val as Ok<T>).okay !== undefined ||
      (val as Err<E>).error !== undefined
    ) {
      this.innerVal = val;
    } else {
      throw new Error("Result must be instantiated with an Ok or Err type.");
    }
  }

  get unwrap(): T {
    if ((this.innerVal as Ok<T>).okay !== undefined) {
      return (this.innerVal as Ok<T>).okay;
    } else if ((this.innerVal as Err<E>).error !== undefined) {
      throw new Error("Attempted to unwrap an error-state Result");
    } else {
      throw new Error(
        "Value is neither okay or an error, and the Result must have been incorrectly instantiated."
      );
    }
  }

  get unwrapErr(): E {
    if ((this.innerVal as Err<E>).error !== undefined) {
      return (this.innerVal as Err<E>).error;
    } else if ((this.innerVal as Ok<T>).okay !== undefined) {
      throw new Error("Attempted to unwrapErr an Ok-state Result");
    } else {
      throw new Error(
        "Value is neither okay or an error, and the Result must have been incorrectly instantiated."
      );
    }
  }

  static toOk<T = any, E = any>(val: T): Result<T, E> {
    return new Result<T, E>({ okay: val });
  }

  static toErr<T = any, E = any>(err: E): Result<T, E> {
    return new Result<T, E>({ error: err });
  }

  isOk(): boolean {
    return (this.innerVal as Ok<T>).okay !== undefined;
  }

  isErr(): boolean {
    return (this.innerVal as Err<E>).error !== undefined;
  }

  map<M = any>(func: (val: T) => M): Result<M, E> | Result<T, E> {
    if ((this.innerVal as Ok<T>).okay !== undefined) {
      const newVal = func((this.innerVal as Ok<T>).okay);
      return Result.toOk<M, E>(newVal);
    } else if ((this.innerVal as Err<E>).error !== undefined) {
      return Result.toErr<T, E>((this.innerVal as Err<E>).error);
    } else {
      throw new Error(
        "Value is neither okay or an error, and the Result must have been incorrectly instantiated."
      );
    }
  }

  mapErr<M = any>(func: (val: E) => M): Result<T, M> | Result<T, E> {
    if ((this.innerVal as Err<E>).error !== undefined) {
      const newVal = func((this.innerVal as Err<E>).error);
      return Result.toErr<T, M>(newVal);
    } else if ((this.innerVal as Ok<T>).okay !== undefined) {
      return Result.toOk<T, E>((this.innerVal as Ok<T>).okay);
    } else {
      throw new Error(
        "Value is neither okay or an error, and the Result must have been incorrectly instantiated."
      );
    }
  }

  mapOrElse<M = any>(func: (val: T) => M, defaultVal: M): M {
    if ((this.innerVal as Ok<T>).okay !== undefined) {
      const newVal = func((this.innerVal as Ok<T>).okay);
      return newVal;
    } else if ((this.innerVal as Err<E>).error !== undefined) {
      return defaultVal;
    } else {
      throw new Error(
        "Value is neither okay or an error, and the Result must have been incorrectly instantiated."
      );
    }
  }
}

export default Result;
