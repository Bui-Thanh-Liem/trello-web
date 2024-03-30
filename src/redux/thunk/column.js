import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createNewColumnAPI,
  updateColumnAPI,
  moveCardTodifferentColumn as moveCardToDifferentCol
} from '~/apis';

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

export const moveCardsInTheSameColumn = createAsyncThunk(
  'column/moveCardsInTheSameColumn',
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

// B1:  Cập nhật lại mảng cardOrderIds cho column cũ (Xóa _id của card drag qua column khác)
// B2:  Cập nhật lại mảng cardOrderIds cho column mới(Thêm _id của card vừa drop )
// B3:  Cập nhật lại trường columnId cho card đó khi drop vào column mới.
export const moveCardTodifferentColumn = createAsyncThunk(
  'column/moveCardTodifferentColumn',
  async (dataUpdate, thunkAPI) => {
    try {
      const { currentCardId, prevColumnId, nextColumnId, dndOrderedColumn } =
        dataUpdate;

      // Kiểm tra xem prevCardOrderIds có phải là placeholder-card không , phải thì trả về [] cho BE
      let prevCardOrderIds = dndOrderedColumn.find(
        (col) => col._id === prevColumnId
      ).cardOrderIds;
      if (prevCardOrderIds[0].includes('placeholder-card')) {
        prevCardOrderIds = [];
      }

      await moveCardToDifferentCol({
        currentCardId,

        prevColumnId,
        prevCardOrderIds,

        nextColumnId,
        nextCardOrderIds: dndOrderedColumn.find(
          (col) => col._id === nextColumnId
        ).cardOrderIds
      });
      return thunkAPI.fulfillWithValue(dataUpdate.dndOrderedColumn);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
