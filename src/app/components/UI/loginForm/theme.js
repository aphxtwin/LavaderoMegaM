'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#283D5B',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.3rem 3rem 0.3rem 3rem',
          backgroundColor: '#283D5B',
          '&:hover': {
            backgroundColor: '#384E6B',
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#283D5B',
            },
            '&:hover fieldset': {
              borderColor: '#283D5B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#283D5B',
            },
          },
        },
      },
    },
  },
});

export default theme;
