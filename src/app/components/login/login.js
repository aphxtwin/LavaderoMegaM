'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <TextField id="outlined-basic" label="Username" variant="outlined" />
      <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" variant="outlined" />
      <Button variant="contained" color="primary">
        Login
      </Button>
    </div>
  )
}
