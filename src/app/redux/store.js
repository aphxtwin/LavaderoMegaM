import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vehicleReducer from './slices/vehicleSlice';

const store = configureStore({
  reducer: {
    user: authReducer,
    vehicle: vehicleReducer,
  },
});

export default store;
