import React from 'react';
import {
  Box, Button, Typography, ThemeProvider, IconButton
} from '@mui/material';
import theme from '../../loginForm/theme';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

function ErrorRefetch({ onClick }) {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{alignItems: 'center' }}>
      <Box sx={{display:'flex',flexDirection:'row',p:2, justifyContent:'center'}}>
      <Link href='/dashboard'>
        <IconButton
          edge="start"
          aria-label="home"
        >  
          <HomeIcon />
          Volver al inicio
        </IconButton>
      </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Algo Salio Mal :/</Typography>
        <Typography>chequea tu conexion a internet e intenta nuevamente</Typography>
        <Button mt={3} onClick={onClick} color="primary">
          Intentar nuevamente
        </Button>
      </Box>
      </Box>

    </ThemeProvider>
  );
}

export default ErrorRefetch;
