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

const navigationFacts = { to: null, from: null, navigated: false };
export const getNavigationFacts = () => navigationFacts;
const setNavigationFacts = ({ from, to }) => {
  // If the routes are equal, we didn't navigate!
  if (from === to || routesAreEqual(from, to)) {
    return Object.assign(navigationFacts, { navigated: false });
  }

  return Object.assign(navigationFacts, {
    navigated: true,
    from,
    to,
    timestamp: new Date().getTime()
  });
};

/**
 * This queues up something that will trigger the zeus stuff to update when KVPs change, or the route does.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {function} props.shouldChangeForRoute A function which determines whether or not we should change the ad based on the new route. This function should take two arguments: the current `location`, and the previous `location` from `react-router-dom`.
 */
export const ZeusRouteResponderImpl = ({
  location,
  keyValuePairs = {},
  shouldChangeForRoute = () => true
}) => {
  const lastLocation = useRef(location);
  const kvpRef = useRef(Object.assign({}, keyValuePairs));

  // Warn the user if they gave us an invalid property here.
  if (typeof shouldChangeForRoute !== "function") {
    zeusNotice(
      "The `shouldChangeForRoute` prop passed to `ZeusRouteResponder` is not a function!"
    );
    shouldChangeForRoute = () => true;
  }
  setNavigationFacts({ from: lastLocation.current, to: location });
  useEffect(() => {
    kvpRef.current = Object.assign({}, keyValuePairs);
    // We need to know whether or not the route changed, and if the caller thinks
    // that it is a change worthy of an update.
    const shouldTriggerChange = !routesAreEqual(lastLocation.current, location)
      ? shouldChangeForRoute(location, lastLocation.current)
      : false;
    lastLocation.current = location;

    // Only change if we're supposed to change for this route.
    if (shouldTriggerChange) {
      triggerKeyValuePairsUpdate(kvpRef.current);
    }
  }, [shouldChangeForRoute, location, keyValuePairs]);

  return null;
};

ZeusRouteResponderImpl.propTypes = {
  location: PropTypes.object.isRequired,
  keyValuePairs: PropTypes.object,
  shouldChangeForRoute: PropTypes.func
};

export const ZeusRouteResponder = withRouter(ZeusRouteResponderImpl);
