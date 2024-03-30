import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis';

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
