import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [], // Cambiamos a un array para almacenar múltiples vehículos
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    addVehicle: (state, action) => {
      // Añadimos el nuevo vehículo al array de vehículos en el estado
      state.vehicles.push(action.payload);
    },
  },
});

export const { addVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
