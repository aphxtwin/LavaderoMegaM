import React from 'react';
import {
  Card, CardContent, Skeleton, Grid,
} from '@mui/material';

export default function SkeletonAddCar() {
  return (
    <Grid item xs={6} sm={6} md={2}>
      <Card sx={{ height: '200px' }}>
        <CardContent>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </CardContent>
      </Card>
    </Grid>
  );
}
