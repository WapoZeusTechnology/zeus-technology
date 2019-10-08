import { getSlotId } from "./getSlotId";

export const triggerRerender = slotId => {
  const element = document.getElementById(getSlotId(slotId));
  element && !!element.rerender && element.rerender();
};
