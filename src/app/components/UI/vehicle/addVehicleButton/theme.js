import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto slab',
    fontWeight: 'regular',
    button: {
      color: '#808080', // Gray color for the button text
      fontSize: '0.6rem', // Default font size
      '@media (max-width:600px)': {
        fontSize: '0.8rem', // Smaller font size for screens less than or equal to 600px
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '250px',
          height: '180px',
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
          '@media (max-width:600px)': {
            width: '130px', // Reduced size for small screens
            height: '120px',
          },
          '@media (max-width:400px)': {
            width: '125px', // Further reduced size for very small screens
            height: '120px',
          },
        },
      },
    },
  },
});

export default theme;
