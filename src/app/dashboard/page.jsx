'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { logIn } from '../redux/slices/authSlice';
import ResponsiveNavbar from '../components/UI/navbar/responsiveNavbar';
import ServicesInProgressTable from '../components/UI/servicesInProgressTable/servicesInProgressTable';
import AddButton from '../components/UI/addButton/addButton';
import ClientForm from '../components/UI/client/createClientForm/clientForm';
// eslint-disable-next-line react/prop-types
export default function Dashboard() {
  const dispatch = useDispatch();
  const [showClientForm, setShowClientForm] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch('/api/auth/currentUser');
      const user = await res.json();

      if (res.ok) {
        dispatch(logIn(user));
      }
    };
    loadUser();
  }, [dispatch]);
  const toggleClientForm = () => {
    setShowClientForm(!showClientForm);
  };
  return (
    <>
      <ResponsiveNavbar />
      <Container maxWidth="xl">
        <ServicesInProgressTable />
        {
          showClientForm
          && (
          <Dialog open={showClientForm} onClose={toggleClientForm} fullWidth maxWidth="sm">
            <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
            <DialogContent>
              <ClientForm />
            </DialogContent>
          </Dialog>
          )
        }
        <AddButton addServicio="dashboard/NuevoServicio" onAddClient={toggleClientForm} />
      </Container>

    </>

  );
}
