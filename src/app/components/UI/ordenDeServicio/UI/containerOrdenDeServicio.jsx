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
      <Box sx={{ p: 1, backgroundColor: '#FFFFFF', zIndex: 1000 }}>
        <ArrowBack />
        <Box px={1}>
          <Typography variant="h1" component="div" gutterBottom>
            Nuevo Servicio
          </Typography>
          <Box sx={
              {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
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
