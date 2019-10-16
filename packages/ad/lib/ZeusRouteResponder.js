import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { triggerKeyValuePairsUpdate } from "@zeus-technology/util";

export const routesAreEqual = (a, b) =>
  !!a &&
  !!b &&
  a.pathname === b.pathname &&
  a.search === b.search &&
  a.hash === b.hash &&
  a.state === b.state;

const navigationFacts = {
  to: null,
  from: null,
  navigated: false,
  lockedElements: {}
};
export const getNavigationFacts = () => navigationFacts;
export const lockZeusElement = name => {
  const register = navigationFacts.lockedElements;

  if (register[name]) {
    return false;
  }

  register[name] = 1;

  return true;
};
const setNavigationFacts = ({ from, to }) => {
  // If the routes are equal, we didn't navigate!
  if (from === to || !Object.keys(from).length || routesAreEqual(from, to)) {
    return Object.assign(navigationFacts, {
      navigated: false,
      from,
      to,
      timestamp: new Date().getTime()
    });
  }

  return Object.assign(navigationFacts, {
    navigated: true,
    from,
    to,
    timestamp: new Date().getTime(),
    lockedElements: {} // Navigated? Reset the render register
  });
};
export let routeResponderReady = false;

/**
 * This queues up something that will trigger the zeus stuff to update when KVPs change, or the route does.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {function} props.shouldChangeForRoute A function which determines whether or not we should change the ad based on the new route. This function should take two arguments: the current `location`, and the previous `location` from `react-router-dom`.
 */
export const ZeusRouteResponderImpl = ({
  location,
  keyValuePairs = {},
  debug = false,
  shouldChangeForRoute = () => true
}) => {
  const lastLocation = useRef({});
  const kvpRef = useRef(Object.assign({}, keyValuePairs));

  // Warn the user if they gave us an invalid property here.
  if (typeof shouldChangeForRoute !== "function") {
    zeusNotice(
      "The `shouldChangeForRoute` prop passed to `ZeusRouteResponder` is not a function!"
    );
    shouldChangeForRoute = () => true;
  }
  useEffect(() => {
    kvpRef.current = Object.assign({}, keyValuePairs);
    // We need to know whether or not the route changed, and if the caller thinks
    // that it is a change worthy of an update.
    const shouldTriggerChange =
      Object.keys(lastLocation.current).length &&
      !routesAreEqual(lastLocation.current, location)
        ? shouldChangeForRoute(location, lastLocation.current)
        : false;

    // Update the navigation facts
    setNavigationFacts({ from: lastLocation.current, to: location });

    // Debug
    debug &&
      console.log("ZEUS DEBUG: ZeusRouteResponder\nConsidering KVP update.", {
        prev: lastLocation.current,
        location,
        navigationFacts: getNavigationFacts(),
        shouldTriggerChange
      });
    lastLocation.current = location;

    // Only change if we're supposed to change for this route.
    if (shouldTriggerChange) {
      triggerKeyValuePairsUpdate(kvpRef.current);
    }
  }, [shouldChangeForRoute, location, keyValuePairs, debug]);

  routeResponderReady = true;
  return null;
};

ZeusRouteResponderImpl.propTypes = {
  location: PropTypes.object.isRequired,
  keyValuePairs: PropTypes.object,
  shouldChangeForRoute: PropTypes.func
};

export const ZeusRouteResponder = withRouter(ZeusRouteResponderImpl);
