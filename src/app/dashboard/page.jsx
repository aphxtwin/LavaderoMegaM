'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { logIn } from '../redux/slices/authSlice';
import ResponsiveNavbar from '../components/UI/navbar/responsiveNavbar';
import ServicesInProgressTable from '../components/UI/servicesInProgressTable/servicesInProgressTable';
import AddButton from '../components/UI/addButton/addButton';
// eslint-disable-next-line react/prop-types
export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch('/api/auth/currentUser');
      const user = await res.json();

      if (res.ok) {
        dispatch(logIn(user));
      }
    };
    loadUser();
    /*
      This is a temporal fix!
      The browser saves the page in the cache, so when you navigate back,
      protected pages can be accessed without any trouble.
      This force a page reaload that triggers the middleware function
    */
    window.onpopstate = () => {
      window.location.reload();
    };
  }, [dispatch]);
  return (
    <>
      <ResponsiveNavbar />
      <Container maxWidth="xl">
        <ServicesInProgressTable />
        <AddButton addServicio="dashboard/NuevoServicio" />
      </Container>

    </>

  );
}
