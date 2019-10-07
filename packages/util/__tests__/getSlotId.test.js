import { getSlotId } from "@zeus-technology/util";

describe("getSlotId variations", () => {
  it("should change «foo» to «zeus_foo»", () => {
    expect(getSlotId("foo")).toBe("zeus_foo");
  });
  it("should change «zeus-foo» to «zeus_foo»", () => {
    expect(getSlotId("zeus-foo")).toBe("zeus_foo");
  });
  it("should leave «zeus_foo» as «zeus_foo»", () => {
    expect(getSlotId("zeus_foo")).toEqual("zeus_foo");
  });
  it("should error on undefined", () => {
    const empty_string = undefined;
    expect(() => getSlotId(empty_string)).toThrowError(
      "Invalid slot ID: undefined"
    );
  });
  it("should error on null", () => {
    const empty_string = null;
    expect(() => getSlotId(empty_string)).toThrowError("Invalid slot ID: null");
  });
  it("should prefix empty strings, too", () => {
    const empty_string = "";
    expect(getSlotId(empty_string)).toEqual(`zeus_${empty_string}`);
  });
  it("should prefix garbage, too", () => {
    const garbage = "";
    expect(getSlotId(garbage)).toEqual(`zeus_${garbage}`);
  });
});
