"use strict";

import React from "react";
import { ZeusAd } from "@zeus-platform/ad";
import renderer from "react-test-renderer";

describe("@zeus-platform/ad", () => {
  it("Should render and match snapshot", () => {
    const sample = renderer.create(<ZeusAd slotId="sample0" />);
    expect(sample.toJSON()).toMatchSnapshot();
  });
});
