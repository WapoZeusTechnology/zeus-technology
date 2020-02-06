import { delay } from "../";

describe("utils.delay()", () => {
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
   * Verify delay works by calling delay with two ms values and then checking that setTimeout was
   * called with the correct ms values when the promises resolve.
   * If any promise rejects, the expect.assertions won't match and test will fail.
   */
  it("Resolves after time provided", () => {
    expect.assertions(2);

    const delay1 = delay(1000).then(() => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    const delay2 = delay(49000).then(() => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 49000);
    });

    jest.runAllTimers();

    return Promise.all([delay1, delay2]);
  });
});
