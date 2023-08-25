'use client';

import React, { useState, Suspense } from 'react';
import { Container } from '@mui/material';
import ResponsiveNavbar from '../components/UI/navbar/responsiveNavbar';
import ServicesInProgressTable from '../components/UI/servicesInProgressTable/servicesInProgressTable';
import AddButton from '../components/UI/addButton/addButton';
import ClientDialog from '../components/UI/client/createClientForm/dialogCreateClient';
import Loading from './loading';
// eslint-disable-next-line react/prop-types
export default function Dashboard() {
  const [showClientForm, setShowClientForm] = useState(false);

  const toggleClientForm = () => {
    setShowClientForm(!showClientForm);
  };
  return (
    <>
      <ResponsiveNavbar />
      <Suspense fallback={<Loading />}>
        <Container maxWidth="xl">
          <ServicesInProgressTable />
          {
          showClientForm
          && (
            <ClientDialog
              showClientForm={showClientForm}
              toggleClientForm={toggleClientForm}
            />
          )
        }
          <AddButton addServicio="dashboard/NuevoServicio" onAddClient={toggleClientForm} />
        </Container>
      </Suspense>
    </>

  );
}
