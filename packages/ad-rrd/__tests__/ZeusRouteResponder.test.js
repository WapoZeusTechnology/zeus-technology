"use strict";

import React, { Fragment } from "react";
import {
  ZeusRouteResponder,
  getNavigationFacts
} from "../lib/ZeusRouteResponder";

import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Link } from "react-router-dom";

import * as util from "@zeus-technology/util";
jest.mock("@zeus-technology/util");
let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
describe("@zeus-platform/ad#ZeusRouteResponder", () => {
  it("behave itself during renders", () => {
    const shouldChangeForRoute = jest.fn((a, b) => !a.search.match(/=bar/));
    let kvps = { a: 1 };
    act(() => {
      ReactDOM.render(
        <MemoryRouter basename="/">
          <ZeusRouteResponder
            shouldChangeForRoute={shouldChangeForRoute}
            keyValuePairs={kvps}
          />
          <Route
            path="*"
            render={props => {
              return (
                <Fragment>
                  <Link to="/test1" id="test1">
                    Test 1!
                  </Link>
                  <Link to="/test2?foo=bar" id="test2">
                    Test 2!
                  </Link>
                  <Link to="/test3" id="test3">
                    Test 3!
                  </Link>
                  <Link to="/test4" id="test4">
                    Test 4!
                  </Link>
                </Fragment>
              );
            }}
          />
        </MemoryRouter>,
        container
      );
    });
    expect(getNavigationFacts()).toEqual(
      expect.objectContaining({
        to: expect.objectContaining({
          hash: "",
          pathname: "/",
          search: "",
          state: undefined
        }),
        from: {},
        navigated: false
      })
    );

    // Click link number 1, make sure that it rerenders
    const test1 = container.querySelector("#test1");
    act(() => {
      test1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(util.triggerKeyValuePairsUpdate.mock.calls).toEqual([[{ a: 1 }]]);
    expect(getNavigationFacts().to.pathname).toBe("/test1");
    expect(getNavigationFacts().from.pathname).toBe("/");
    expect(getNavigationFacts().navigated).toBe(true);

    // Click link two, make sure it _does not_ cause a rerender
    const test2 = container.querySelector("#test2");
    act(() => {
      test2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(util.triggerKeyValuePairsUpdate.mock.calls.length).toBe(1);
    expect(util.triggerKeyValuePairsUpdate.mock.calls).toEqual([[{ a: 1 }]]);
    expect(getNavigationFacts().to.pathname).toBe("/test2");
    expect(getNavigationFacts().from.pathname).toBe("/test1");
    expect(getNavigationFacts().navigated).toBe(true);

    // This right here allows us to demonstrate that triggering the same
    // route location a second time will _not_ trigger as a new navigation.
    act(() => {
      test2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(getNavigationFacts().to.pathname).toBe("/test2");
    expect(getNavigationFacts().from.pathname).toBe("/test2");
    expect(getNavigationFacts().navigated).toBe(false);

    // Click link three, make sure it causes a rerender
    const test3 = container.querySelector("#test3");
    act(() => {
      test3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(util.triggerKeyValuePairsUpdate.mock.calls).toEqual([
      [{ a: 1 }],
      [{ a: 1 }]
    ]);

    kvps["b"] = 1;
    const test4 = container.querySelector("#test4");
    act(() => {
      test4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(util.triggerKeyValuePairsUpdate.mock.calls).toEqual([
      [{ a: 1 }],
      [{ a: 1 }],
      [{ a: 1, b: 1 }]
    ]);
  });
});
