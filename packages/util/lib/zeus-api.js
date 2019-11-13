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
  const renderFunc = slotId => {
    const element = document.getElementById(getSlotId(slotId));
    element && !!element.render && element.render();
  };

  if (Array.isArray(slotIds)) {
    slotIds.forEach(renderFunc);
    return;
  }

  renderFunc(slotIds);
  return;
};

export const forceRebuildAndRefresh = slotIds => {
  const rebuildFunc = slotId => {
    const element = document.getElementById(getSlotId(slotId));
    element && !!element.rerender && element.rerender();
  };

  if (Array.isArray(slotIds)) {
    slotIds.forEach(rebuildFunc);
    return;
  }

  rebuildFunc(slotIds);
  return;
};
