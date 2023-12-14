'use client';

import React from 'react';
import {
  Container, Grid, Box, Skeleton,
} from '@mui/material';

function DashboardSkeleton() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ marginTop: '2rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width={210} height={40} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              <Grid item xs={4} sm={4}>
                <Skeleton variant="text" width={210} height={40} />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Skeleton variant="text" width={210} height={40} />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Skeleton variant="text" width={210} height={40} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default DashboardSkeleton;
