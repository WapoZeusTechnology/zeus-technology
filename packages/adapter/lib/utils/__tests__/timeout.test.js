import { timeout } from "../";

describe("utils.timeout", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /**
   * Verifies timeout works in async/await form using a message and ms value.
   * When the promise rejects it checks that setTimeout has been called with the correct ms value
   * and also verifies the rejection returns with an error containing the message string passed
   * into timeout.
   *
   * If the promise were not to reject then the expect.assertions count won't match and test will
   * fail.
   */
  it("Raises exception after timeout provided", async () => {
    expect.assertions(3);

    try {
      const promise = timeout("message", 1000);
      jest.runAllTimers();
      await promise;
    } catch (err) {
      expect(err).toEqual(new Error("message"));
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    }
  });

  /**
   * Verifies timeout works in promise form using a different message and ms value.
   * When the promise rejects it checks that setTimeout has been called with the correct ms value
   * and also verifies the rejection returns with an error containing the message string passed
   * into timeout.
   *
   * If the promise were not to reject then the expect.assertions count won't match and test will
   * fail.
   */
  it("Accepts other messages and times", () => {
    expect.assertions(3);

    const promise = timeout("Timeout waiting for something", 60000).catch(
      err => {
        expect(err).toEqual(new Error("Timeout waiting for something"));
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 60000);
      }
    );
    jest.runAllTimers();
    return promise;
  });
});
