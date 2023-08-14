import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tipoDeVehiculo: "",
    patente: "",
    marca: "",
    modelo: "",
    observaciones: "",
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    addVehicle: (state, action) => {
        const { tipoDeVehiculo, patente, marca, modelo, observaciones } = action.payload;
        state.tipoDeVehiculo = tipoDeVehiculo;
        state.patente = patente;
        state.marca = marca;
        state.modelo = modelo;
        state.observaciones = observaciones;
    },
  },
});

export const { addVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;