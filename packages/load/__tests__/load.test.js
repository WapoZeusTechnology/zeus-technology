"use strict";

import { zeusLoader } from "../lib";

describe("@zeus-platform/load", () => {
  it("Should render in a simple case and match snapshot", () => {});
  it("Should render with KVPs and match snapshot", () => {
    window.zeus = { run: jest.fn() };
    const sample = zeusLoader({ url: "https://foo.com" });
    expect(sample).toMatchSnapshot();
  });
});
