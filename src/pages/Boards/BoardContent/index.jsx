import { Box } from '@mui/material';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
//
import Columns from './Columns';
import { mapOrder } from '~/utils/sorts';
import { useEffect, useState } from 'react';

const BoardContent = ({ board }) => {
  // const columnsOrdered = mapOrder(board?.columns, board?.columnOrderIds, '_id');
  const [orderedColumnsState, setOrderedColumnsState] = useState([]);

  useEffect(() => {
    setOrderedColumnsState(
      mapOrder(board?.columns, board?.columnOrderIds, '_id')
    );
  }, [board]);

  // Handle mode (arrayMove)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log(active, over);

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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
      </Box>
    </DndContext>
  );
};

export default BoardContent;
