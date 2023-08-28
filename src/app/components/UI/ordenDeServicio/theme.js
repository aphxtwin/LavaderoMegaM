'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// eslint-disable-next-line import/no-mutable-exports
let theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove border or set a different color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove border or set a different color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove border or set a different color on focus
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#2F3842',
    },
    text: {
      primary: '#2F3842',
    },

  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#283D5B',
    },
    h2: {
      fontSize: '1rem',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
