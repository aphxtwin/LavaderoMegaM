import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';

export default function StepContainer({ children }) {
  return (
    <ThemeProvider theme={theme}>
        {children} 
    </ThemeProvider>
  );
}
