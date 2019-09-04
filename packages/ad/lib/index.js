import React from "react";
import PropTypes from "prop-types";
/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 */
export const ZeusAd = ({ slotId, ...props }) => {
  const useSlotId = `zeus_${slotId.replace(/^zeus[_-]/, "")}`;
  return <zeus-ad id={useSlotId} {...props} />;
};

ZeusAd.propTypes = {
  slotId: PropTypes.string.isRequired
};
