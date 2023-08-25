import 'server-only';
import React from 'react';
import {
  Box, Typography, ThemeProvider,
} from '@mui/material';
import ArrowBack from './arrowBack';
import theme from '../theme';

// eslint-disable-next-line react/prop-types
function OrdenDeServicioContainer({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 1, backgroundColor: '#FFFFFF' }}>
        <ArrowBack />
        <Box sx={{ padding: '0 1rem 0 1rem' }}>
          <Typography variant="h1" component="div" gutterBottom>
            Nuevo Servicio
          </Typography>
          <Box sx={
              {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1.5rem',
              }
            }
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default OrdenDeServicioContainer;
