import { createTheme } from '@mui/material/styles';

// I want primary color for badges this: sx={{backgroundColor:'#283D5B', color: 'white'}} add to this theme

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto slab',
    fontWeight: 'regular',
    button: {
      color: 'rgba(64, 87, 121, 1)',
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
          border: '2px dashed #405779',
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
          backgroundColor: '#283D5B', 
          color: 'white'
        },
        colorPrimary: {
          backgroundColor: '#283D5B', // This targets the primary color variant of Badge
          color: 'white'
        }
      }
    },
  },
});

export default theme;
