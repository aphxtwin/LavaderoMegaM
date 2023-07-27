import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// eslint-disable-next-line import/no-mutable-exports
let theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab',
    h1: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2.4rem',
      },
    },
    h5: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.3rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '0.8rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
      '@media (min-width:960px)': {
        fontSize: '1.2rem',
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
