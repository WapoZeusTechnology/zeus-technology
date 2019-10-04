import React from "react";
import PropTypes from "prop-types";
import { getSlotId } from "@zeus-technology/util";

/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 */
const ZeusAd = ({ slotId, ...props }) => {
  return <zeus-ad id={getSlotId(slotId)} {...props} />;
};
ZeusAd.propTypes = {
  slotId: PropTypes.string.isRequired
};

export { ZeusAd };
