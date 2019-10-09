import { getSlotId } from "./getSlotId";

export const triggerRerender = slotId => {
  const element = document.getElementById(getSlotId(slotId));
  element && !!element.rerender && element.rerender();
};

export const triggerKeyValuePairsUpdate = (kvps = {}) => {
  if (window.hasOwnProperty("zeus")) {
    window.zeus.emit("RESET_KEYVALUES", kvps);
  }
};
