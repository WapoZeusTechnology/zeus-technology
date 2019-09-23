import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const getSlotId = inputSlotId => `zeus_${inputSlotId.replace(/^zeus[_-]/, "")}`;

/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 */
export const ZeusAd = ({ slotId, ...props }) => {
  return <zeus-ad id={getSlotId(slotId)} {...props} />;
};
ZeusAd.propTypes = {
  slotId: PropTypes.string.isRequired
};

/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot in a manner which responds to your Router.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 * @param {bool} props.changeOnNavigate By default, the ad slots will refresh when the route does. Pass false into this value to disable that functionality.
 */
export const ZeusAdWithRouter = withRouter(
  ({ slotId, changeOnNavigate = true, ...props }) => {
    const useSlotId = getSlotId(slotId);

    if (changeOnNavigate) {
      const element = document.getElementById(useSlotId);
      element && !!element.render && element.render();
    }

    return <ZeusAd slotId={slotId} {...props} />;
  }
);

ZeusAdWithRouter.propTypes = {
  slotId: PropTypes.string.isRequired,
  changeOnNavigate: PropTypes.bool
};
