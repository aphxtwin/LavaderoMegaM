'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import StepContainer from '../UI/stepContainer';
import VehicleCars from '../UI/s2Components/vehicleCars';

function StepTwo() {
  return (
    <StepContainer>
      <Box sx={{backgroundColor:'black', p:2,}}>
        <Box sx={{ 
          m:'auto',
          color:'black',
          borderRadius:'10px', 
          backgroundColor: 'white', 
          p:2,
          }}>
          <Typography
            variant="h5"
            py={1}
            sx={{display:'flex',m:'auto', justifyContent:'center'}}
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
