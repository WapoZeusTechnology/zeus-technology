"use strict";

import { zeusLoader } from "../lib/zeusLoader";

describe("@zeus-platform/load", () => {
  it("Should render with KVPs and match snapshot", () => {
    const sample = zeusLoader({ url: "https://foo.com" });
    expect(sample).toMatchSnapshot();
  });
});
