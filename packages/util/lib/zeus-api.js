import { getSlotId } from "./getSlotId";

export const triggerRerender = slotId => {
  console.debug("~~~ ZEUS RERENDER ~~~");
  const element = document.getElementById(getSlotId(slotId));
  console.debug("ELEMENT!", element);
  element && !!element.rerender && element.rerender();
};
