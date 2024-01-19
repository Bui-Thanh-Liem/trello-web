import { Box } from '@mui/material';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
//
import Columns from './Columns';
import Column from './Columns/Column';
import Card from './Columns/Column/Cards/Card';
import { mapOrder } from '~/utils/sorts';
import { useEffect, useState } from 'react';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
};

const BoardContent = ({ board }) => {
  // const columnsOrdered = mapOrder(board?.columns, board?.columnOrderIds, '_id');
  const [orderedColumnsState, setOrderedColumnsState] = useState([]);

  // Tại 1 thời điểm chỉ có card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemStyle, setActiveDragItemStyle] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  // Animation khi thả SortItem giữ chổ cho đến khi SortItem quay lại
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  };

  useEffect(() => {
    setOrderedColumnsState(
      mapOrder(board?.columns, board?.columnOrderIds, '_id')
    );
  }, [board]);

  // Event handlers
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemStyle(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const handleDragOver = (event) => {
    // Nếu là column thì không làm gì cả
    if (ACTIVE_DRAG_ITEM_TYPE.COLUMN === activeDragItemStyle) return;

    console.log(event);
  };

  // Handle mode (arrayMove)
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // không làm gì khi over là undefine
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(
        (column) => column._id === active.id
      );
      const newIndex = orderedColumnsState.findIndex(
        (column) => column._id === over.id
      );
      const orderedArrMove = arrayMove(orderedColumnsState, oldIndex, newIndex);
      // Call API update datas
      // const orderedArrMoveIds = orderedArrMove.map((column) => column._id);
      setOrderedColumnsState(orderedArrMove);
    }

    setActiveDragItemId(null);
    setActiveDragItemStyle(null);
    setActiveDragItemData(null);
  };

  // Sensors
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 }
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.customTrello.boardContentHeight,
          marginTop: (theme) => theme.customTrello.appBarHeight,
          bgcolor: 'primary.main',
          paddingTop: '.7rem',
          paddingBottom: '.7rem',
          maxWidth: '100vw',
          overflowX: 'auto'
        }}
      >
        <Columns columns={orderedColumnsState} />
        {/* DragOverlay đặt ngang cấp với Sortable và có item bên trong là tất cả SortItem */}
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItemId &&
          activeDragItemStyle === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
              <Column column={activeDragItemData} />
            ) : null}

          {activeDragItemId &&
          activeDragItemStyle === ACTIVE_DRAG_ITEM_TYPE.CARD ? (
              <Card card={activeDragItemData} />
            ) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
