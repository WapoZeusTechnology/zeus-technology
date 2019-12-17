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

let __existingPersonalizedAdPermissionValue = null;
export const triggerPersonalizedAdPermissionsChange = newValue => {
  if (newValue === __existingPersonalizedAdPermissionValue) return;

  // Coerce the value into a Boolean if it isn't.
  __existingPersonalizedAdPermissionValue = !!newValue;
  // Emit the event.
  window.hasOwnProperty("zeus") &&
    zeus.emit(
      "PERSONALIZED_ADS_PERMISSION",
      __existingPersonalizedAdPermissionValue
    );
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
