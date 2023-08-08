'use client';

import React, { useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Grid, Skeleton } from '@mui/material';

const LazyLoginForm = React.lazy(() => import('./components/UI/loginForm/loginForm'));

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
      sx={{ height: '100vh' }}
      disableequaloverflow="true"
      spacing={3}
    >
      <Suspense fallback={<FormSkeleton />}>
        <LazyLoginForm />
      </Suspense>
    </Grid>
  );
}
function FormSkeleton() {
  return (
    <div>
      <Skeleton variant="rectangular" height={56} animation="wave" />
      <Skeleton variant="rectangular" height={56} animation="wave" style={{ marginTop: '16px' }} />
      <Skeleton variant="rectangular" height={56} animation="wave" style={{ marginTop: '16px' }} />
    </div>
  );
}
