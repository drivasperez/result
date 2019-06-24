import Result, { Ok, Err } from "./index";

describe("Result", () => {
  test("Calling unwrap on an error-state Result throws an exception", () => {
    const error = { error: "Error" };
    const myResult = new Result<string, string>(error);
    expect(() => myResult.unwrap).toThrow();
  });

  test("Calling unwrap on an some-state Result returns the some", () => {
    const result = { okay: 3 };
    const myResult = new Result<number, string>(result);
    expect(myResult.unwrap).toBe(3);
  });

  test("Calling unwrapErr on an error-state Result returns the error value", () => {
    const error = { error: "Error" };
    const myResult = new Result<string, string>(error);
    expect(myResult.unwrapErr).toBe("Error");
  });

  test("Calling unwrap on an error-state Result throws an exception", () => {
    const result = { okay: 3 };
    const myResult = new Result<number, string>(result);
    expect(() => myResult.unwrapErr).toThrow();
  });

  test("Calling asOk and asErr produces the correct Result types", () => {
    const val = 22;
    const err = "Blah";
    expect(Result.toOk(val).unwrap).toBe(22);
    expect(Result.toErr(err).unwrapErr).toBe("Blah");
  });

  test("Calling isOk on an Ok result returns true, calling isErr returns false, and vice versa", () => {
    const shouldBeOkay = Result.toOk("Hello!");
    const shouldBeError = Result.toErr("Oh no!");

    expect(shouldBeOkay.isOk()).toBe(true);
    expect(shouldBeOkay.isErr()).toBe(false);

    expect(shouldBeError.isOk()).toBe(false);
    expect(shouldBeError.isErr()).toBe(true);
  });

  test("Calling map on an Ok result maps the result", () => {
    const toBeMapped = Result.toOk(222);
    expect(toBeMapped.map(x => 2 * x).unwrap).toBe(444);
  });

  test("Calling map on an Err result maps to an Err result", () => {
    const toBeMapped = Result.toErr<string, number>(222);
    expect(toBeMapped.map(x => x + 2).unwrapErr).toBe(222);
  });

  test("Calling mapErr on an Ok result returns the Ok result", () => {
    const toBeMapped = Result.toOk(222);
    expect(toBeMapped.mapErr(x => 2 * x).unwrap).toBe(222);
  });

  test("Calling mapErr on an Err result maps to an Err result", () => {
    const toBeMapped = Result.toErr(222);
    expect(toBeMapped.mapErr(x => 2 * x).unwrapErr).toBe(444);
  });

  test("Calling mapOrElse on an Ok result returns the mapped result", () => {
    const toBeMapped = Result.toOk<number, string>(5);
    expect(toBeMapped.mapOrElse(x => 5 * x, 10)).toBe(25);
  });

  test("Calling mapOrElse on an Err result returns the default result", () => {
    const toBeMapped = Result.toErr<number, string>("NOPE");
    expect(toBeMapped.mapOrElse(x => 5 * x, 10)).toBe(10);
  });
});
