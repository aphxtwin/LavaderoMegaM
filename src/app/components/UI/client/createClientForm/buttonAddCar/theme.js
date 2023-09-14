import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto slab',
    fontWeight: 'regular',
    button: {
      color: 'black',
      fontSize: '0.6rem',
      '@media (min-width:600px)': {
        fontSize: '0.8rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          width: '125px',
          height: '120px',
          background: '#FFFFFF',
          border: '2px dashed black',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          top: '0px',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
          '@media (min-width:400px)': {
            width: '130px',
          },
          '@media (min-width:600px)': {
            width: '250px',
            height: '180px',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#000000',
          color: 'white',
        },
        colorPrimary: {
          backgroundColor: '#000000', // This targets the primary color variant of Badge
          color: 'white',
        },
      },
    },
  },
});

export default theme;
