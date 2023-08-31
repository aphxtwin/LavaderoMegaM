import React from 'react';
import { Skeleton, ListItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SkeletonSearch() {
  return (
    <ListItem sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '8px',
    }}
    >
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="circle" width={40} height={40} />
      <CheckCircleIcon style={{ visibility: 'hidden' }} />
      {' '}
    </ListItem>
  );
}

export default SkeletonSearch;
