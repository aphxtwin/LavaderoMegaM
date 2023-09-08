'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveStep } from '../../../../redux/slices/stepperSlice';
import StepOne from './step1Cliente';
import StepTwo from './step2Servicio';

function StepSwitcher() {
  const activeStep = useSelector(selectActiveStep);

  switch (activeStep) {
    case 0:
      return <StepOne />;
    case 1:
      return <StepTwo />;

    default:
      return null; // or some default component or error message
  }
}

export default StepSwitcher;
