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
  },
});

export const { addVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
