import { configureStore } from '@reduxjs/toolkit';

import boardSlice from '~/redux/slices/boardSlice';

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: { board: boardSlice }
});

export default store;
