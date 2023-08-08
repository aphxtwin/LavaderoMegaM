'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Grid } from '@mui/material';
import LoginForm from './components/UI/loginForm/loginForm';

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
      sx={{ height: '100vh' }}
      disableequaloverflow="true"
      spacing={3}
    >
      <LoginForm />
    </Grid>
  );
}
