'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.3rem 3rem 0.3rem 3rem',
          backgroundColor: '#000000',
          color: '#FFFFFF', // Text color white for contrast
          '&:hover': {
            backgroundColor: '#333333', // A shade of grey for hover
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
        },
      },
    },
  },
});

export default theme;
