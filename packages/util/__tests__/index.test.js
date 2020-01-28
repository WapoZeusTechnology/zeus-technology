import * as utilIndex from "../lib/index";

describe("util", () => {
  test("Verify exports", () => {
    expect(typeof utilIndex.getSlotId).toBe("function");
    expect(typeof utilIndex.zeusNotice).toBe("function");
    expect(typeof utilIndex.triggerKeyValuePairsUpdate).toBe("function");
    expect(typeof utilIndex.triggerRerender).toBe("function");
    expect(utilIndex).toHaveProperty("getSlotId");
  });
});
