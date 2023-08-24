'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { logIn } from '../redux/slices/authSlice';
import ResponsiveNavbar from '../components/UI/navbar/responsiveNavbar';
import ServicesInProgressTable from '../components/UI/servicesInProgressTable/servicesInProgressTable';
import AddButton from '../components/UI/addButton/addButton';
import ClientDialog from '../components/UI/client/createClientForm/dialogCreateClient';
import Loading from './loading';
import loadUser from './actions';
// eslint-disable-next-line react/prop-types
export default function Dashboard() {
  const dispatch = useDispatch();
  const [showClientForm, setShowClientForm] = useState(false);

  useEffect(() => {
    const user = async () => loadUser();
    if (user) {
      dispatch(logIn(user));
    }
  }, [dispatch]);
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
