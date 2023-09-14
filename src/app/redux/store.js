import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import vehicleReducer from './slices/vehicleSlice';
import stepperReducer from './slices/stepperSlice';
import clientReducer from './slices/clientSlice';
const store = configureStore({
  reducer: {
    user: authReducer,
    ui: uiReducer,
    stepper: stepperReducer,
    vehicle: vehicleReducer,
    client: clientReducer,
  },
});

export default store;
