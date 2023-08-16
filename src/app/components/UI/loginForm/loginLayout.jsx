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
  const formStyle = {
    height: '75vh',
  };
  const paperStyle = {
    padding: '0 1.5rem 0 1.5rem',
		marginLeft:'2.5rem',
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={10} sx={paperStyle}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          sx={formStyle}
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
                  src="./images/logo-dodle.svg"
                  width={200}
                  height={100}
                  alt="Logo"
                  priority
                />
              </Typography>
              <Typography
                variant="subtitle1"
                mt={2}
                align="center"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                  color: '#082755',
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
    </ThemeProvider>
  );
}
LoginFormLayout.propTypes = {
  children: PropTypes.func.isRequired,
};
export default LoginFormLayout;
