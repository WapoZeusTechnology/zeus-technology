"use strict";

import { zeusNotice } from "@zeus-platform/util";

const mockLog = jest.fn();

describe("@zeus-platform/util", () => {
  it("should call console.log()", () => {
    const oldLog = console.log;
    console.log = mockLog;
    zeusNotice("test");
    console.log = oldLog;
    expect(mockLog.mock.calls.length).toBe(3);
    expect(mockLog.mock.calls[1][0]).toBe("test");
  });
});
