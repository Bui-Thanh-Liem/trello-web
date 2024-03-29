import { createAsyncThunk } from '@reduxjs/toolkit';

import { createNewCardAPI } from '~/apis';

export const createNewCard = createAsyncThunk(
  'card/createNewCard',
  async (newCardData, thunkAPI) => {
    try {
      const newCard = await createNewCardAPI(newCardData);
      return thunkAPI.fulfillWithValue(newCard);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
