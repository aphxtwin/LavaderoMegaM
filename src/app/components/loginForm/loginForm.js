'use client'
import React, { useState } from 'react';
import style from './loginForm.module.css'
import { TextField, Button} from '@mui/material';


function LoginForm() {
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
    
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        <TextField
          color='primary'
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          color='primary'
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained" className='bg-amber-500 hover:bg-amber-600'>
          Login
        </Button>

    </form>
  );
}

export default LoginForm;
