import React from 'react';
import { Box, Typography } from '@mui/material';

export default function DividerWithCircle() {
  return (
    <Box sx={{ position: 'relative', textAlign: 'center', mb: 2 }}>
      <Box sx={{
        display: 'inline-block', width: '100%', height: '3px', backgroundColor: '#D1D1D1',
      }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: 'absolute', top: '-0.2em', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#f1f5f9', px: 1,
        }}
      >
        O
      </Typography>
    </Box>
  );
}
