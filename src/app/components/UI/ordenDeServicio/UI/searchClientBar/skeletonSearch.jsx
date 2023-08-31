import React from 'react';
import { Skeleton, ListItem } from '@mui/material';

function SkeletonSearch() {
  return (
    <ListItem sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px',
    }}
    >
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="text" ml={0.5} width="30%" />
      <Skeleton variant="circle" width={40} height={30} />
    </ListItem>
  );
}

export default SkeletonSearch;
