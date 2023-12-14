'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import StepContainer from '../UI/stepContainer';
import VehicleCars from '../UI/s2Components/vehicleCars';

function StepTwo() {
  return (
    <StepContainer>
      <Box sx={{ backgroundColor: 'white', p: 2 }}>
        <Box sx={{
          m: 'auto',
          width: '95%',
          color: 'black',
          backgroundColor: 'white',
          borderTop: '4px solid #f1f5f9',
          borderBottom: '4px solid #f1f5f9',
          p: 2,
        }}
        >
          <Typography
            variant="h4"
            py={1}
            sx={{ display: 'flex', m: 'auto', justifyContent: 'center' }}
            gutterBottom
          >
            Selecciona el vehículo que será asignado al servicio
          </Typography>
        </Box>
      </Box>
      <VehicleCars />
    </StepContainer>
  );
}
export default StepTwo;
