/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState: {
    activeStep: 0,
  },
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    incrementStep: (state) => {
      state.activeStep += 1;
    },
  },
});

export const { setActiveStep, incrementStep } = stepperSlice.actions;

export const selectActiveStep = (state) => state.stepper.activeStep;

export default stepperSlice.reducer;
