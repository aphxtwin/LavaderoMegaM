import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    addVehicle: (state, action) => {
      state.vehicles.push(action.payload);
    },
    resetVehicles: (state) => {
      state.vehicles = [];
    },
  },
});

export const { addVehicle, resetVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
