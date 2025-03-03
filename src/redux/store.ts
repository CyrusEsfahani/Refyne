import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Optionally disable serializable check for specific cases (not recommended unless necessary)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // Only disable if absolutely necessary, as it bypasses safety checks
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;