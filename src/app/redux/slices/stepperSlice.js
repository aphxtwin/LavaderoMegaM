import { createSlice } from '@reduxjs/toolkit';

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState: {
    activeStep: 0,
  },
  reducers: {
    setActiveStep: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.activeStep = action.payload;
    },
  },
});

export const { setActiveStep } = stepperSlice.actions;

export const selectActiveStep = (state) => state.stepper.activeStep;

export default stepperSlice.reducer;
