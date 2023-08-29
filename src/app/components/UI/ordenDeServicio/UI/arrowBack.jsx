'use client';

import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';

function ArrowBack() {
  const router = useRouter();
  const handleBack = () => {
    router.push('/dashboard');
  };
  return (
    <IconButton
      edge="start"
      color="secondary"
      onClick={handleBack}
      aria-label="back"
      sx={{ marginBottom: '0.5rem', marginLeft: '0.1rem' }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}

export default ArrowBack;
