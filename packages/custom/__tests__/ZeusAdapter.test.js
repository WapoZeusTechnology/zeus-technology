import { ZeusAdapter } from "../lib/ZeusAdapter";

jest.mock("window-with-zeus");
import { FakeZeus } from "window-with-zeus";
describe("ZeusAdapter", () => {
  beforeAll(() => delete globalThis.zeus);

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
   * 1. Don't define Zeus
   * 2. Try running a command
   * 3. Verify we get an exception because Zeus isn't ready yet.
   */
  test("#_waitForZeus:throws", done => {
    expect(globalThis.hasOwnProperty("zeus")).toBeFalsy;
    const sample = new ZeusAdapter({});

    // Our sample command.
    const command1 = jest.fn();
    expect(command1.mock.calls.length).toBe(0);
    expect(command1.mock.calls).toEqual([]);

    // Make sure we get an exception if we get too rowdy.
    expect(() => sample.runCommand(command1)).toThrowError(
      "Zeus is not yet ready!"
    );
    return done();
  });

  /**
   * Test plan:
   * 1. Don't define zeus yet
   * 2. Start ZeusAdapter
   * 3. Verify that it has not yet been run.
   * 4. Now, define Zeus on the globalThis scope using `FakeZeus`.
   * 5. Now verify that the command has been run.
   */
  test("#_waitForZeus", async () => {
    expect(globalThis.hasOwnProperty("zeus")).toBeFalsy;

    const command1 = jest.fn();
    const sample = new ZeusAdapter({ init: command1 });

    // Thie verifies we haven't run yet, and then defines Zeus
    setTimeout(() => {
      // Our sample command.
      expect(command1.mock.calls.length).toBe(0);
      expect(command1.mock.calls).toEqual([]);

      // Set zeus.
      console.debug("!!!! SETTING ZEUS!");
      globalThis.zeus = new FakeZeus();
    }, ZeusAdapter.WaitQueueDelay * 1.5);

    // Start the adapter
    await sample.start();

    // Now that zeus is defined, we should be able to see that our command has run.
    expect(command1.mock.calls.length).toBe(1);
  });

  /**
   * Test plan:
   * 1. Instantiate the Adapter
   * 2. Attempt to run a command that isn't a function
   * 3. Verify that the throw is correct.
   */
  test("#runCommand()", async () => {
    globalThis.zeus = new FakeZeus();
    const sample = new ZeusAdapter({});
    await sample.start();
    const command1 = true;
    expect(() => sample.runCommand(command1)).toThrowError(
      "ZeusAdapter attempted to run a Zeus command that wasn't a function."
    );
  });

  test("basic constructor", async () => {
    // Bypass the queue.
    globalThis.zeus = new FakeZeus();

    const test1 = jest.fn();
    const sample = new ZeusAdapter({
      init: test1
    });
    await sample.start();

    expect(test1.mock.calls.length).toBe(1);
  });
});
