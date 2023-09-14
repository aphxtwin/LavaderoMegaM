import 'server-only';
import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  ThemeProvider,
} from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import theme from './theme';

function LoginFormLayout({ children }) {
  const paperStyle = {
    display: 'flex',
    padding: '0 1.5rem 0 1.5rem',
    flexDirection: 'column',
    gap: '1.5rem',
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={containerStyle}>
        <Paper elevation={10} sx={paperStyle}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            sx={{ height: '75vh' }}
          >

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                  }}
                >
                  <Image
                    src="./images/Group 46.svg"
                    width={250}
                    height={150}
                    alt="Logo"
                    priority
                  />
                </Typography>
                <Typography
                  variant="subtitle1"
                  mb={1}
                  align="center"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                    color: '#000000',
                    fontWeight: 'semi-bold',
                  }}
                >
                  Ingrese sus datos para continuar
                </Typography>
              </Grid>
              <Box>
                { children }
              </Box>
            </Box>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
LoginFormLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LoginFormLayout;
