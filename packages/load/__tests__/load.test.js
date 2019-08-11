"use strict";

import React from "react";
import { ZeusLoader } from "../lib";
import renderer from "react-test-renderer";

describe("@zeus-platform/load", () => {
  it("Should render and match snapshot", () => {
    const sample = renderer.create(
      <ZeusLoader url="https://test.zeustechnology.com" />
    );
    expect(sample.toJSON()).toMatchSnapshot();
  });
});
