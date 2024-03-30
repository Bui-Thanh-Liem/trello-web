import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep, isEmpty } from 'lodash';
import { toast } from 'react-toastify';

//
import { fetchBoardDetails, moveColumns } from '~/redux/thunk/board';
import {
  createNewColumn,
  moveCardsInTheSameColumn,
  moveCardTodifferentColumn
} from '~/redux/thunk/column';
import { createNewCard } from '~/redux/thunk/card';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sorts';

const initialState = {};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Board
    builder.addCase(fetchBoardDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBoardDetails.fulfilled, (state, action) => {
      state.loading = false;

      // Xử lý khi column.cards rỗng , không kéo thả được
      const boardClone = cloneDeep(action.payload);
      boardClone.columns = mapOrder(
        boardClone.columns,
        boardClone.columnOrderIds,
        '_id'
      );
      boardClone.columns.forEach((col) => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)];
          col.cardOrderIds = [generatePlaceholderCard(col)._id];
        } else {
          col.cards = mapOrder(col.cards, col.cardOrderIds, '_id');
        }
      });

      state.board = boardClone;
    });
    builder.addCase(fetchBoardDetails.rejected, (state) => {
      state.loading = false;
    });

    // Columns
    builder.addCase(createNewColumn.fulfilled, (state, action) => {
      // Xử lý khi mới tạo column thì cards rỗng , không kéo thả được
      if (isEmpty(action.payload.cards)) {
        action.payload.cards = [generatePlaceholderCard(action.payload)];
        action.payload.cardOrderIds = [
          generatePlaceholderCard(action.payload)._id
        ];
      }

      state.board.columns.push(action.payload);
      state.board.columnOrderIds.push(action.payload._id);
      toast.success('Success create new a column');
    });
    builder.addCase(moveColumns.fulfilled, (state, action) => {
      state.board.columnOrderIds = action.payload.columnOrderIds;
      state.board.columns = action.payload.columns;
    });
    builder.addCase(moveCardTodifferentColumn.fulfilled, (state, action) => {
      const columnOrderIds = action.payload.map((c) => c._id);
      state.board.columnOrderIds = columnOrderIds;
      state.board.columns = action.payload;
    });

    // Cards
    builder.addCase(createNewCard.fulfilled, (state, action) => {
      const currentColumn = state.board.columns.find(
        (col) => col._id === action.payload.columnId
      );
      if (currentColumn) {
        if (currentColumn.cards.some((card) => card.FE_placeholderCard)) {
          currentColumn.cards = [action.payload];
          currentColumn.cardOrderIds = [action.payload._id];
        } else {
          currentColumn.cards.push(action.payload);
          currentColumn.cardOrderIds.push(action.payload._id);
          toast.success('Success create new a Card');
        }
      }
    });
    builder.addCase(moveCardsInTheSameColumn.fulfilled, (state, action) => {
      const currentColumn = state.board.columns.find(
        (col) => col._id === action.payload.columnId
      );
      currentColumn.cardOrderIds = action.payload.cardOrderIds;
      currentColumn.cards = action.payload.cards;
    });
  }
});

export const { updateBoard } = boardSlice.actions;
export default boardSlice.reducer;
