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

export const forceRefresh = slotIds => {
  if (Array.isArray(slotIds)) {
    slotIds.forEach(slotId => {
      let element = document.getElementById(getSlotId(slotId));
      element && !!element.render && element.render();
    });
  } else {
    const element = document.getElementById(getSlotId(slotIds));
    element && !!element.render && element.render();
  }
};

export const forceRebuildAndRefresh = slotIds => {
  if (Array.isArray(slotIds)) {
    slotIds.forEach(slotId => {
      let element = document.getElementById(getSlotId(slotId));
      element && !!element.rerender && element.rerender();
    });
  } else {
    const element = document.getElementById(getSlotId(slotIds));
    element && !!element.rerender && element.rerender();
  }
};
