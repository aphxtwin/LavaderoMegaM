'use client';

import React from 'react';
import {
  Box, Typography, IconButton, ThemeProvider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import theme from './theme';

function NewServiceContainer({ children }) {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Cliente', 'Vehiculo', 'Pago'];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, backgroundColor: '#FFFFFF' }}>
        <IconButton
          edge="start"
          color="secondary"
          onClick={() => router.back()}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h1" component="div" gutterBottom>
          Nuevo Servicio
        </Typography>
        <Box sx={
            { 
                display: 'flex',
                justifyContent: 'space-between', 
                alignItems: 'center',
            }}
            >
          {steps.map((step, index) => (
            <Box key={step} sx={{ textAlign: 'center' }}>
              <Typography color={index === activeStep ? 'secondary' : 'textPrimary'}>{step}</Typography>
              {index === activeStep && <Box sx={{ height: '4px', width: '100%', backgroundColor: '#283D5B' }} />}
            </Box>
          ))}
        </Box>
        {children}
      </Box>
    </ThemeProvider>
  );
}

export default NewServiceContainer;

