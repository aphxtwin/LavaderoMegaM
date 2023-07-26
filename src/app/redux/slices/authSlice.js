import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => ({ ...state, currentUser: action.payload }),
    logOut: (state) => ({ ...state, currentUser: null }),
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
