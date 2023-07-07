import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

function LoginForm() {
  const formStyle = {
    height:'80vh',
    marginTop:'50px',
  }
  const paperStyle={
    margin: 'auto',
    padding:'0 1rem 0 1rem'
  }
  const btnLogin = {
    padding:'0.3rem 3rem 0.3rem 3rem',
    backgroundColor:'#27272a',
    "&:hover":{
      backgroundColor:'#09090b'
    },
    width:'100%'
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
    <form onSubmit={handleSubmit}>
      <Paper elevation={10} sx={paperStyle}>
        <Grid container 
          direction={'column'} 
          justifyContent={'center'} 
          alignItems={'stretch'}
          spacing={3}
          sx={formStyle} 
        >
          <Grid item>              
            <Typography variant="h4" align='center' sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
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
              onChange={handleUsernameChange}
              fullWidth required
            />
          </Grid>
          <Grid item  >
            <TextField
              color='primary'
              id="outlined-password-input"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              fullWidth required
            />
          </Grid>
          <Grid item >
            <Button type="submit" size='large' fullwidth sx={btnLogin} variant="contained">
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}

export default LoginForm;

