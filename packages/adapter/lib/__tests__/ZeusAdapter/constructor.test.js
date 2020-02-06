import { ZeusAdapter } from "../../ZeusAdapter";

describe("ZeusAdapter.constructor()", () => {
  /**
   * Test plan:
   * 1. Instantiate the `ZeusAdapter`
   * 2. Verify we have an instance of `ZeusAdapter`.
   */
  test("creates instance of ZeusAdapter", () => {
    const adapter = new ZeusAdapter({});
    expect(adapter).toBeInstanceOf(ZeusAdapter);
  });
});
