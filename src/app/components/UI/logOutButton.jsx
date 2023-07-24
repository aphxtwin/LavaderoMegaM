'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { logOut } from '../../redux/slices/authSlice';

function LogOutButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch('/api/auth/logOut', { method: 'POST' });
    if (res.ok) {
      dispatch(logOut());
      router.push('/');
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogOutButton;
