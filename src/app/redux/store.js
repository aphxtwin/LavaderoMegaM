import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import vehicleReducer from './slices/vehicleSlice';
import stepperReducer from './slices/stepperSlice';

const store = configureStore({
  reducer: {
    user: authReducer,
    ui: uiReducer,
    stepper: stepperReducer,
    vehicle: vehicleReducer,
  },
});

export default store;
