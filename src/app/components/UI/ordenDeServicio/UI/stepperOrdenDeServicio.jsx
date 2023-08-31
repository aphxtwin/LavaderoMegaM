'use client';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, Typography,
} from '@mui/material';

function StepperOrdenDeServicio() {
  const [activeStep] = useState(0);
  const steps = ['Cliente', 'Vehiculo', 'Servicio', 'Pago'];
  const theme = useTheme();
  return (
    <>
      {steps.map((step, index) => (
        <Box key={step} sx={{ textAlign: 'start', width: '100%', mb: 1, mx:1, }}>
          <Typography // Using variant prop to provide semantic meaning
            sx={{
              fontSize: {
                xs: theme.typography.pxToRem(11), // for very small devices
                sm: theme.typography.pxToRem(16), // for small devices
                md: theme.typography.pxToRem(18), // for medium devices and above
              },
            }}
            color={index === activeStep ? 'secondary' : 'textPrimary'}
          >
            {step}
          </Typography>
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