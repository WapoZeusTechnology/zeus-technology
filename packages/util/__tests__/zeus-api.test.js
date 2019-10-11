import * as util from "../lib/getSlotId";
jest.mock("@zeus-technology/util");
util.getSlotId = jest.fn().mockImplementation(x => `zeus_${x}`);

import { triggerRerender, triggerKeyValuePairsUpdate } from "../lib/zeus-api";

describe("zeus-api", () => {
  /**
   * Test plan
   * - Create a valid HTML element with an ID that Zeus knows about
   * - Give it a stubbed out `rerender()` method that we expect `zeus-api` to use
   * - Call `triggerRerender()` with the element's ID (less the `zeus_`)
   *   - Verify that `getSlotId()` was called properly, that's a known side-effect
   *   - Verify that the `rerender` stub was called.
   * - Change the ID of the element so that `zeus-api` won't be able to find it
   * - Call `triggerRerender()` with the _good_ ID again (less the `zeus_`)
   *   - Verify that `getSlotId()` was called properly
   *   - Verify that `rerender` did _not_ get called.
   */
  it("#triggerRerender()", () => {
    const testElement = document.createElement("p");
    testElement.id = "zeus_test_element";
    testElement.rerender = jest.fn();
    document.body.appendChild(testElement);

    expect(() => triggerRerender("test_element")).not.toThrow();
    expect(testElement.rerender.mock.calls.length).toBe(1);
    expect(util.getSlotId.mock.calls.length).toBe(1);
    expect(util.getSlotId.mock.calls).toEqual([["test_element"]]);

    testElement.id = "foo";

    expect(() => triggerRerender("test_element")).not.toThrow();
    expect(testElement.rerender.mock.calls.length).toBe(1);
    expect(util.getSlotId.mock.calls.length).toBe(2);
    expect(util.getSlotId.mock.calls).toEqual([
      ["test_element"],
      ["test_element"]
    ]);
  });

  it("#triggerKeyValuePairsUpdate", () => {
    expect(() => triggerKeyValuePairsUpdate()).not.toThrow();

    // Stub out zeus...
    window.zeus = { emit: jest.fn() };
    expect(() => triggerKeyValuePairsUpdate()).not.toThrow();
    expect(window.zeus.emit.mock.calls).toEqual([["RESET_KEYVALUES", {}]]);
    expect(() => triggerKeyValuePairsUpdate({ a: 1 })).not.toThrow();
    expect(window.zeus.emit.mock.calls).toEqual([
      ["RESET_KEYVALUES", {}],
      ["RESET_KEYVALUES", { a: 1 }]
    ]);
  });
});
