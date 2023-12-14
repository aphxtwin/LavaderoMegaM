import React from 'react';
import { Skeleton, Box } from '@mui/material';

function SkeletonSearch() {
  return (
    <Box sx={{ width: '100%', my: 1 }}>
      <Skeleton variant="text" width="90%" height={50} />
      <Skeleton variant="text" ml={0.5} width="30%" />
    </Box>
  );
}

export default SkeletonSearch;
