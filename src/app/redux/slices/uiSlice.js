import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showDialogFormNuevoVehiculo: false,
    // Add other UI states if needed

  },
  reducers: {
    toggleDialogFormNuevoVehiculo: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.showDialogFormNuevoVehiculo = !state.showDialogFormNuevoVehiculo;
    },
    // Add other reducers if needed
  },
});

export default uiSlice.reducer;
export const { toggleDialogFormNuevoVehiculo } = uiSlice.actions;
