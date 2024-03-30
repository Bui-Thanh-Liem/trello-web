import { Box } from '@mui/material';
import {
  DndContext,
  useSensor,
  useSensors,
  // MouseSensor,
  // TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  pointerWithin,
  closestCorners,
  getFirstCollision
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useState, useRef } from 'react';
import { cloneDeep, isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

//
import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensor.js';
import Columns from './Columns';
import Column from './Columns/Column';
import Card from './Columns/Column/Cards/Card';
import { generatePlaceholderCard } from '~/utils/formatters';
import { moveColumns } from '~/redux/thunk/board';
import {
  moveCardsInTheSameColumn,
  moveCardTodifferentColumn
} from '~/redux/thunk/column';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
};

const BoardContent = ({ board }) => {
  const dispatch = useDispatch();

  // MapOrdered
  const [orderedColumnsState, setOrderedColumnsState] = useState([]);

  const lastOverId = useRef(null);

  // Tại 1 thời điểm chỉ có card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [activeColumnBeforeRerender, setActiveColumnBeforeRerender] =
    useState(null);

  useEffect(() => {
    setOrderedColumnsState(board?.columns);
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
    activeDraggingCardData,
    triggerFrom
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

        // Thêm placeholder-card nếu column không có card nào
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

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

        // Xóa placeholder-card đi khi đã có card tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_placeholderCard
        );

        // Cập nhật idCard trong cardOrderIds sau khi xóa cards
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (column) => column._id
        );
      }

      if (triggerFrom === 'handleDragEnd') {
        // Call api drag card to different column
        dispatch(
          moveCardTodifferentColumn({
            currentCardId: activeDraggingCardId,
            prevColumnId: activeColumnBeforeRerender._id,
            nextColumnId: nextOverColumn._id,
            dndOrderedColumn: nextColumns
          })
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
        activeDraggingCardData,
        'handleDragOver'
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
          activeDraggingCardData,
          'handleDragEnd'
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

        // Call api kéo thả card trong cùng 1 column
        dispatch(
          moveCardsInTheSameColumn({
            columnId: activeColumnBeforeRerender._id,
            orderedCard: orderedArrMove
          })
        );
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

      // Array moved
      const orderedArrMove = arrayMove(orderedColumnsState, oldIndex, newIndex);

      // Vẫn có bước này để ứng dụng không bị nhấp nhấy.
      setOrderedColumnsState(orderedArrMove);

      // Call API update datas
      dispatch(moveColumns(orderedArrMove));
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

  // Custom thuật toán phát hiện va chạm (khi dùng closestCorners thì bị flickering khi để con trỏ ở giữa)
  // Mục đích của thuật toán phát hiện va chạm là trả về overId
  const collisionDetectionStrategy = useCallback(
    (args) => {
      // Nếu là COLUMN thì vẫn sử dụng thuật toán va chạm closestCorners
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      // Khi là cards thì sử dụng pointerWithin , custom lại thuật toán va chạm
      // Tìm các điểm giao nhau với con trỏ
      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections?.length > 0) return;

      // Trả về 1 mảng các va chạm ở đây
      // const intersetions =
      //   pointerIntersections?.length > 0
      //     ? pointerIntersections
      //     : rectIntersection(args);

      let overId = getFirstCollision(pointerIntersections, 'id');
      if (overId) {
        const checkColumn = orderedColumnsState.find(
          (col) => col._id === overId
        );

        // Đoạn này nếu overId là column thì tìm card gần nhất trong column để lấy id
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers?.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id;
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumnsState]
  );

  return (
    <DndContext
      sensors={sensors}
      // Thuật toán phát hiện va chạm
      collisionDetection={collisionDetectionStrategy}
      // collisionDetection={closestCorners}

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
