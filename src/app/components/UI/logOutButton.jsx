'use client';

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function LogOutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch('/api/auth/logOut', { method: 'POST' });
    if (res.ok) {
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
