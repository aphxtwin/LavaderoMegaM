'use client';

import React, { useState } from 'react';
import {
  Box, Typography, IconButton, ThemeProvider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import theme from '../theme';

// eslint-disable-next-line react/prop-types
function OrdenDeServicioContainer({ children }) {
  const router = useRouter();
  const [activeStep] = useState(0);
  const steps = ['Cliente', 'Vehiculo', 'Pago'];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 1, backgroundColor: '#FFFFFF' }}>
        <IconButton
          edge="start"
          color="secondary"
          onClick={() => router.back()}
          aria-label="back"
          sx={{ marginBottom: '0.5rem' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ padding: '0 1rem 0 1rem' }}>
          <Typography variant="h1" component="div" gutterBottom>
            Nuevo Servicio
          </Typography>
          <Box sx={
            {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
            }
}
          >
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
          </Box>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default OrdenDeServicioContainer;
