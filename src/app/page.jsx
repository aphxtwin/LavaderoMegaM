'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Grid } from '@mui/material';
import LoginForm from './components/layout/loginForm/loginForm';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

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
      <LoginForm setUser={setUser} />
    </Grid>
  );
}
