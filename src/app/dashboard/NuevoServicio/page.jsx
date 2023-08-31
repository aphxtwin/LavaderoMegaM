import 'server-only';
import React from 'react';
import OrdenDeServicioContainer from '../../components/UI/ordenDeServicio/UI/containerOrdenDeServicio';
import StepperOrdenDeServicio from '../../components/UI/ordenDeServicio/UI/stepperOrdenDeServicio';
import StepOne from '../../components/UI/ordenDeServicio/Layout/step1Cliente';

export default function NuevoServicio() {
  return (
    <>
      <OrdenDeServicioContainer>
        <StepperOrdenDeServicio />
      </OrdenDeServicioContainer>
      <StepOne />
    </>
  );
}
