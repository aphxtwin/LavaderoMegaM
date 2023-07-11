import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';

function loginForm() {
  const formStyle = {
    height:'75vh',
  }
  const paperStyle={
    marginLeft:'7%',
    padding:'0 1.5rem 0 1.5rem'
  }
  const btnLogin = {
    padding:'0.3rem 3rem 0.3rem 3rem',
    backgroundColor:'#27272a',
    "&:hover":{
      backgroundColor:'#09090b'
    },
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (    
    
      <Paper elevation={10} sx={paperStyle}>
        <Grid container 
          direction={'column'} 
          justifyContent={'center'} 
          alignItems={'stretch'}
          sx={formStyle} 
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{display:'flex', flexDirection:"column",gap:'1.5rem'}}>
              <Grid item>      
                <Typography variant="h4" align='center' sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}>
                  MEGA MultiServicios
                </Typography>
                <Typography variant="subtitle1" mt={2} align='center' sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }}}>
                  Ingrese sus datos para continuar
                </Typography>
              </Grid>     
              <Grid item> 
                <TextField
                  color='primary'
                  id="outlined-basic"
                  label="Usuario"
                  variant="outlined"
                  value={username}
                  name='username'
                  onChange={handleUsernameChange}
                  fullWidth required
                />
              </Grid>
              <Grid item  >
                <TextField
                  color='primary'
                  id="outlined-password-input"
                  label="Contraseña"
                  name='password'
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth required
                />
              </Grid>
              <Grid item >
                <Button type="submit" size='large' fullWidth sx={btnLogin} variant="contained">
                  Ingresar
                </Button>
              </Grid>
            </Box>

          </form>  
        </Grid>
      </Paper>
  );
}

export default loginForm;

