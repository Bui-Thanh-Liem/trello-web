import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cloneDeep, isEmpty } from 'lodash';

//
import { fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis';
import { generatePlaceholderCard } from '~/utils/formatters';
import { createNewColumn, moveCards } from '~/redux/slices/columnSlice';
import { createNewCard } from '~/redux/slices/cardSlice';
import { mapOrder } from '~/utils/sorts';

const initialState = {};

export const fetchBoardDetails = createAsyncThunk(
  'board/fetchBoardDetails',
  async (boardId, thunkAPI) => {
    try {
      const board = await fetchBoardDetailsAPI(boardId);
      return thunkAPI.fulfillWithValue(board);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const moveColumns = createAsyncThunk(
  'column/moveColumns',
  async (orderedColumns, thunkAPI) => {
    try {
      const orderedColumnIds = orderedColumns.map((c) => c._id);
      await updateBoardDetailsAPI(orderedColumns[0].boardId, {
        columnOrderIds: orderedColumnIds
      });
      return thunkAPI.fulfillWithValue({
        columnOrderIds: orderedColumnIds,
        columns: orderedColumns
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
    });
    builder.addCase(moveColumns.fulfilled, (state, action) => {
      state.board.columnOrderIds = action.payload.columnOrderIds;
      state.board.columns = action.payload.columns;
    });

    // Cards
    builder.addCase(createNewCard.fulfilled, (state, action) => {
      const currentColumn = state.board.columns.find(
        (col) => col._id === action.payload.columnId
      );
      currentColumn.cards.push(action.payload);
      currentColumn.cardOrderIds.push(action.payload._id);
    });
    builder.addCase(moveCards.fulfilled, (state, action) => {
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
