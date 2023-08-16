import React from 'react';
import { Grid } from '@mui/material';
import LoginRedirectLogic from './components/UI/loginForm/loginRedirectLogic';
import LoginFormLayout from './components/UI/loginForm/loginLayout';

const LoginForm = React.lazy(() => import('./components/UI/loginForm/loginForm'));

export default function Home() {
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
      <LoginRedirectLogic>
        <LoginFormLayout>
          <LoginForm />
        </LoginFormLayout>
      </LoginRedirectLogic>
    </Grid>

  );
}
