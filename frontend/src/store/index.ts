import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { moviesAPI } from './slices/movies.slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    }).concat(moviesAPI.middleware),
  preloadedState: {},
  reducer: {
    [moviesAPI.reducerPath]: moviesAPI.reducer,
  },
});

setupListeners(store.dispatch);
