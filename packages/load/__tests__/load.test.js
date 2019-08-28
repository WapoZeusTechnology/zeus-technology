"use strict";

import React from "react";
import { ZeusLoader } from "../lib";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("@zeus-platform/load", () => {
  afterEach(() => {
    const killme = document.getElementById("____zeus_script");
    killme && document.head.removeChild(killme);
  });
  it("Should render in a simple case and match snapshot", () => {
    window.zeus = { run: jest.fn() };
    const sample = mount(<ZeusLoader url="https://test.zeustechnology.com" />);
    expect(sample.html()).toMatchSnapshot();
    const scriptTag = document.getElementById("____zeus_script");
    expect(scriptTag).toMatchSnapshot();
    scriptTag.onload();
    expect(window.zeus.run.mock.calls.length).toEqual(1);
    expect(window.zeus.run.mock.calls[0][0]).toEqual({ kvpairs: [] });
  });
  it("Should render with KVPs and match snapshot", () => {
    window.zeus = { run: jest.fn() };
    const sample = mount(
      <ZeusLoader
        keyValuePairs={[{ key1: "value1", key2: "value2" }]}
        url="https://test.zeustechnology.com"
      />
    );
    expect(sample.html()).toMatchSnapshot();
    const scriptTag = document.getElementById("____zeus_script");
    expect(scriptTag).toMatchSnapshot();
    scriptTag.onload();
    expect(window.zeus.run.mock.calls.length).toEqual(1);
    expect(window.zeus.run.mock.calls[0][0]).toEqual({
      kvpairs: [{ key1: "value1", key2: "value2" }]
    });
  });
});
