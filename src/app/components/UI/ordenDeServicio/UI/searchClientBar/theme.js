import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove the border or set a different color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove the border or set a different color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // Remove the border or set a different color on focus
          },
        },
      },
    },
  },
});

export default theme;
