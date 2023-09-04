'use client';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

function StepperOrdenDeServicio() {
  const [activeStep] = useState(0);
  const steps = ['Cliente', 'Vehiculo', 'Servicio', 'Pago'];
  const theme = useTheme();

  return (
    <>
      {steps.map((step, index) => (
        <Box
          key={step}
          sx={{
            textAlign: 'start',
            width: '100%',
            mx: 1, // Add space before value
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: theme.typography.pxToRem(12),
                sm: theme.typography.pxToRem(16),
                md: theme.typography.pxToRem(21),
              },
            }}
            color={index === activeStep ? 'secondary' : 'textPrimary'}
          >
            {step}
          </Typography>
          {index === activeStep && (
            <Box
              sx={{
                height: '5px',
                width: '100%',
                backgroundColor: '#283D5B',
                borderRadius: '5px',
              }}
            />
          )}
        </Box>
      ))}
    </>
  );
}

export default StepperOrdenDeServicio;
