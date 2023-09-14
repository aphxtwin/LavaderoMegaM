import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientId: null,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    resetClientId: (state) => {
      state.clientId = null;
    },
  },
});

export const { setClientId, resetClientId } = clientSlice.actions;
export const selectClientId = (state) => state.client.clientId;
export default clientSlice.reducer;