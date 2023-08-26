import 'server-only';
import React from 'react';
import { Box } from '@mui/material';
import OrdenDeServicioContainer from '../../components/UI/ordenDeServicio/UI/containerOrdenDeServicio';
import StepperOrdenDeServicio from '../../components/UI/ordenDeServicio/UI/stepperOrdenDeServicio';
import StepOne from '../../components/UI/ordenDeServicio/Layout/step1Cliente';

export default function NuevoServicio() {
  return (
    <Box sx={{ height: '100vh' }}>
      <OrdenDeServicioContainer>
        <StepperOrdenDeServicio />
      </OrdenDeServicioContainer>
      <StepOne />
    </Box>
  );
}
