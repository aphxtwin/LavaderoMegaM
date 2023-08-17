import React from 'react';
import {
  Box, Typography, IconButton, ThemeProvider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../theme';

// eslint-disable-next-line react/prop-types
function OrdenDeServicioContainer({ children, onArrowClick }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 1, backgroundColor: '#FFFFFF' }}>
        <IconButton
          edge="start"
          color="secondary"
          onClick={onArrowClick}
          aria-label="back"
          sx={{ marginBottom: '0.5rem' }}
        >
          <ArrowBackIcon />
        </IconButton>
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
