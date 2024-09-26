import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import serviceOrdersReducer from './slices/serviceOrderSlice';
// Import other slices as needed

export const store = configureStore({
  reducer: {
    user: userReducer,
    serviceOrders: serviceOrdersReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;