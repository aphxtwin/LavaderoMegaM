import React from 'react';
import { ThemeProvider, Box } from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../theme';

export default function StepContainer({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'white', borderTop: '2px solid #DDDDDD' }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}
StepContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
