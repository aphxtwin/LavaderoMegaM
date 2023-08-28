'use client';

import React, { useState } from 'react';
import {
  Box, Typography,
} from '@mui/material';

function StepperOrdenDeServicio() {
  const [activeStep] = useState(0);
  const steps = ['Cliente', 'Vehiculo', 'Servicio', 'Pago'];

  return (
    <>
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
    </>

  );
}

export default StepperOrdenDeServicio;
