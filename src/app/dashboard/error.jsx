'use client';

import React, { useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
    }}
    >
      <Typography variant="h4" color="error">
        Something went wrong!
      </Typography>
      <Button variant="contained" color="primary" onClick={() => reset()}>
        Try again
      </Button>
    </Box>
  );
}
