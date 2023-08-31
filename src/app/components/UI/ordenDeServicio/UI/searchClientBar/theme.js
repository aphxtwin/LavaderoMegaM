'use client';

import { createTheme } from '@mui/material/styles';

// eslint-disable-next-line import/no-mutable-exports
const theme = createTheme({
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
  typography: {
    sm:'body1',
    xs:'body2',
  },
});

export default theme;
