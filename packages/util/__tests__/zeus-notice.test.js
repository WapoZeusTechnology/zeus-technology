"use strict";

import { zeusNotice } from "../lib";

const mockLog = jest.fn();

describe("@zeus-platform/util", () => {
  it("should call console.log()", () => {
    const oldLog = console.info;
    console.info = mockLog;
    zeusNotice("test");
    console.info = oldLog;
    expect(mockLog.mock.calls.length).toBe(3);
    expect(mockLog.mock.calls[1][0]).toBe("test");
  });
});
