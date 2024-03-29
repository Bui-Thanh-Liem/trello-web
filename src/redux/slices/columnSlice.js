import { createAsyncThunk } from '@reduxjs/toolkit';

import { createNewColumnAPI, updateColumnAPI } from '~/apis';

export const createNewColumn = createAsyncThunk(
  'column/createNewColumn',
  async (newColumnData, thunkAPI) => {
    try {
      const newColumn = await createNewColumnAPI(newColumnData);
      return thunkAPI.fulfillWithValue(newColumn);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const moveCards = createAsyncThunk(
  'column/updateColumn',
  async (updateData, thunkAPI) => {
    try {
      const cardOrderIds = updateData.orderedCard.map((c) => c._id);
      await updateColumnAPI(updateData.columnId, {
        cardOrderIds
      });
      return thunkAPI.fulfillWithValue({
        columnId: updateData.columnId,
        cardOrderIds,
        cards: updateData.orderedCard
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
