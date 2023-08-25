import 'server-only';
import React from 'react';
import OrdenDeServicioContainer from '../../components/UI/ordenDeServicio/UI/containerOrdenDeServicio';
import StepperOrdenDeServicio from '../../components/UI/ordenDeServicio/UI/stepperOrdenDeServicio';

export default function NuevoServicio() {
  return (
    <OrdenDeServicioContainer>
      <StepperOrdenDeServicio />
    </OrdenDeServicioContainer>
  );
}
