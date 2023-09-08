import 'server-only';
import React from 'react';
import OrdenDeServicioContainer from '../../components/UI/ordenDeServicio/UI/containerOrdenDeServicio';
import StepperOrdenDeServicio from '../../components/UI/ordenDeServicio/UI/stepperOrdenDeServicio';
import StepSwitcher from '../../components/UI/ordenDeServicio/Layout/stepSwitcher';

export default function NuevoServicio() {
  return (
    <>
      <OrdenDeServicioContainer>
        <StepperOrdenDeServicio />
      </OrdenDeServicioContainer>
      <StepSwitcher />
    </>
  );
}
