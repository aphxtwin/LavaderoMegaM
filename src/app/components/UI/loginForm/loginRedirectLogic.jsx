'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

function LoginRedirectLogic({ children }) {
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
      {children}
    </Grid>
  );
}
LoginRedirectLogic.propTypes = {
  children: PropTypes.func.isRequired,
};

export default LoginRedirectLogic;
