import { ZeusAdapter } from "../lib/ZeusAdapter";

jest.mock("window-with-zeus");
import { FakeZeus } from "window-with-zeus";
describe("ZeusAdapter", () => {
  /**
   * Test plan:
   * 1. Instantiate the `ZeusAdapter`
   * 2. Verify we have an instance of `ZeusAdapter`.
   */
  test("#constructor", () => {
    const sample = new ZeusAdapter({});
    expect(sample).toBeInstanceOf(ZeusAdapter);
  });

  /**
   * Test plan:
   * 1. Don't define zeus yet
   * 2. Try running a command (which is just a Jest mock)
   * 3. Verify that it has not yet been run.
   * 4. Now, define Zeus on the globalThis scope using `FakeZeus`.
   * 5. In a timeout, after the wait queue delay, verify that the command has been run.
   * 6. In another timeout, after the wait queue delay, verify that commands are running
   *    instantly, as the queue has run dry and Zeus _is_ defined.
   */
  test("wait queue", done => {
    expect(globalThis.hasOwnProperty("zeus")).toBeFalsy;
    const sample = new ZeusAdapter({});
    const command1 = jest.fn();
    sample._runInZeus(command1);
    expect(command1.mock.calls).toEqual([]);
    globalThis.zeus = new FakeZeus();
    setTimeout(() => {
      // Now that zeus is defined, we should be able to see that our command has run.
      expect(command1.mock.calls).toEqual([[]]);
      setTimeout(() => {
        // And now that the queue should have dried up, we should be running commands instantly.
        sample._runInZeus(command1);
        expect(command1.mock.calls).toEqual([[], []]);
        expect(() => sample._waitQueueRunner()).not.toThrow();

        return done();
      }, ZeusAdapter.WaitQueueDelay * 1.5);
    }, ZeusAdapter.WaitQueueDelay * 1.5);
  });

  /**
   * Test plan:
   * 1. Instantiate the Adapter
   * 2. Attempt to run a command that isn't a function
   * 3. Verify that the throw is correct.
   */
  test("wait queue", () => {
    expect(globalThis.hasOwnProperty("zeus")).toBeFalsy;
    const sample = new ZeusAdapter({});
    const command1 = true;
    expect(() => sample._runInZeus(command1)).toThrowError(
      "ZeusAdapter attempted to run a Zeus command that wasn't a function."
    );
  });
});
