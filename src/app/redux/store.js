import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import vehicleReducer from './slices/vehicleSlice';

const store = configureStore({
  reducer: {
    user: authReducer,
    ui: uiReducer,
    vehicle: vehicleReducer,
  },
});

export default store;
