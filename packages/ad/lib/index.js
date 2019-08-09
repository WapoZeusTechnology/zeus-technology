import React from "react";
/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 */
export const ZeusAd = props => {
  return (
    <div style={{ border: "10px solid red" }}>
      <zeus-ad id={props.slotId} {...props} />
    </div>
  );
};
