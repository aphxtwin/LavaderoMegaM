import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
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
    },
    h2: {
      fontSize: '1rem',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
