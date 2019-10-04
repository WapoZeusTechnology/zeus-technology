/**
 * All Zeus slots must be prefixed with `zeus_`, and this function allows
 * all of the `ZeusAd` variants to have that behavior consistently.
 * @param {string} inputSlotId This is the slot ID you wish to start with.
 */
export const getSlotId = inputSlotId =>
  `zeus_${inputSlotId.replace(/^zeus[_-]/, "")}`;
