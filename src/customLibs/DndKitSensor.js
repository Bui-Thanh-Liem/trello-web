import {
  MouseSensor as DndMouseSensor,
  TouchSensor as DndTouchSensor
} from '@dnd-kit/core';

// Block DnD event propagation if element have "data-no-dnd" attribute
const handler = ({ nativeEvent: event }) => {
  let cur = event.target;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

export class MouseSensor extends DndMouseSensor {
  static activators = [{ eventName: 'onMouseDown', handler }];
}

export class TouchSensor extends DndTouchSensor {
  static activators = [{ eventName: 'onTouchStart', handler }];
}
