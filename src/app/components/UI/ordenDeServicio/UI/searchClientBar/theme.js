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
});

theme = responsiveFontSizes(theme);

export default theme;
