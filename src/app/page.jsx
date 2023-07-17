'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Grid } from '@mui/material';
import { context } from './userContext';
import LoginForm from './components/layout/loginForm/loginForm';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { userContext, setUserContext } = useContext(context);

  useEffect(() => {
    if (Object.keys(userContext).length !== 0) {
      router.push('/dashboard');
    }
    if (user) {
      setUserContext(user.nombre);
      router.push('/dashboard');
    }
  }, [router, setUserContext, user, userContext]);

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
      <LoginForm setUser={setUser} />
    </Grid>
  );
}
