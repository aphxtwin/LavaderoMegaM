'use client';

import React, { useState } from 'react';
import {
  Box, Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import LayoutOrdenDeServicio from './containerOrdenDeServicio';

// eslint-disable-next-line react/prop-types
function StepperOrdenDeServicio({ children }) {
  const router = useRouter();
  const [activeStep] = useState(0);
  const steps = ['Cliente', 'Vehiculo', 'Pago'];

  return (
    <LayoutOrdenDeServicio onArrowClick={() => router.back()}>
      {steps.map((step, index) => (
        <Box key={step} sx={{ textAlign: 'start', width: '100%', marginRight: '1rem' }}>
          <Typography sx={{ marginBottom: '2.5px' }} color={index === activeStep ? 'secondary' : 'textPrimary'}>{step}</Typography>
          {index === activeStep && (
          <Box sx={{
            height: '5px', width: '100%', backgroundColor: '#283D5B', borderRadius: '5px',
          }}
          />
          )}
        </Box>
      ))}
      {children}
    </LayoutOrdenDeServicio>
  );
}

export default StepperOrdenDeServicio;
