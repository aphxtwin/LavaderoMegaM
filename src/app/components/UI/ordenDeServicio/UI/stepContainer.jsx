import React from 'react';
import { ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../theme';

export default function StepContainer({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
StepContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
