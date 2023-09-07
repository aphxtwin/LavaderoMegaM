/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    addVehicle: (state, action) => {
      /* 
        handle the different scenarios when adding a new car
        it specifies the action type that will be useful when
        storing in the database
      */
      const vehicleWithAction = {
        ...action.payload.details,
        action: action.payload.type,
      };
      state.vehicles.push(vehicleWithAction);
    },
    resetVehicles: (state) => {
      state.vehicles = [];
    },
    // If needed, you can add more reducers for other specific scenarios.
  },
});

export const { addVehicle, resetVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;

