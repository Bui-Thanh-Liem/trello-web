import { Box } from '@mui/material';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

//
import Columns from './Columns';
import Column from './Columns/Column';
import Card from './Columns/Column/Cards/Card';
import { mapOrder } from '~/utils/sorts';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
};

const BoardContent = ({ board }) => {
  // MapOrdered
  const [orderedColumnsState, setOrderedColumnsState] = useState([]);

  // Tại 1 thời điểm chỉ có card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [activeColumnBeforeRerender, setActiveColumnBeforeRerender] =
    useState(null);

  useEffect(() => {
    setOrderedColumnsState(
      mapOrder(board?.columns, board?.columnOrderIds, '_id')
    );
  }, [board]);

  // Tìm column đang chứa cardId (làm dữ liệu cards rồi mới làm cho orderCard)
  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find((column) =>
      column?.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  // Di chuyển card giữa các columns khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnsState((preveColumnsState) => {
      //  Tìm vị trí của overCardIndex (card trong column đích)
      const overCardIndex = overColumn?.cards.findIndex(
        (card) => card._id === overId
      );

      let newCardIndex;

      const isBelowOverCardOver =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverCardOver ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      // Clone ra 1 columns để xử lý dữ liệu
      const nextColumns = cloneDeep(preveColumnsState);
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumn) {
        // Xóa card dragging ở column active
        nextActiveColumn.cards = nextActiveColumn?.cards?.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Xóa idCard trong cardOrderIds sau khi xóa cards
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (column) => column._id
        );
      }

      if (nextOverColumn) {
        // Xóa cardDragging đã có trong overColumn
        nextOverColumn.cards = nextOverColumn?.cards?.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Thêm cardDragging vào columnOver
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        });

        // Cập nhật idCard trong cardOrderIds sau khi xóa cards
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (column) => column._id
        );
      }

      return nextColumns;
    });
  };

  // Event handlers
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.id) {
      setActiveColumnBeforeRerender(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    // Nếu là column thì không làm gì cả
    if (ACTIVE_DRAG_ITEM_TYPE.COLUMN === activeDragItemType) return;

    // không làm gì khi không có over hoặc active
    if (!over || !active) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active;
    const { id: overId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn?._id !== overColumn?._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // không làm gì khi không có over hoặc active
    if (!over || !active) return;

    // Card
    if (ACTIVE_DRAG_ITEM_TYPE.CARD === activeDragItemType) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active;
      const { id: overId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overId);

      if (!activeColumn || !overColumn) return;

      if (activeColumnBeforeRerender._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        const oldIndex = activeColumnBeforeRerender?.cards?.findIndex(
          (card) => card._id === activeDragItemId
        );
        const newIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overId
        );

        const orderedArrMove = arrayMove(
          activeColumnBeforeRerender.cards,
          oldIndex,
          newIndex
        );
        setOrderedColumnsState((prevColumns) => {
          const cloneColumns = cloneDeep(prevColumns);

          // Find trả về 1 phần tử thỏa mãn điều kiện (tham chiếu)
          const targetColumns = cloneColumns.find(
            (column) => column._id === overColumn._id
          );
          targetColumns.cards = orderedArrMove;
          targetColumns.cardOrderIds = orderedArrMove?.map(
            (column) => column._id
          );

          return cloneColumns;
        });
      }
    }

    // Column
    if (
      ACTIVE_DRAG_ITEM_TYPE.COLUMN === activeDragItemType &&
      active.id !== over.id
    ) {
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

    // Những State này chỉ dùng 1 lần khi kéo column hoặc kéo card nên set lại null để thực hiện lần kéo tiếp theo
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setActiveColumnBeforeRerender(null);
  };

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
      // Thuật toán phát hiện va chạm
      collisionDetection={closestCorners}
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
          activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
            <Column column={activeDragItemData} />
          ) : null}
          {activeDragItemId &&
          activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD ? (
            <Card card={activeDragItemData} />
          ) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
