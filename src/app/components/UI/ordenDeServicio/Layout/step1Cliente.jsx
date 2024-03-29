'use client';

import React from 'react';
import {
  Grid, Container, Box,
} from '@mui/material';
import NewClientCard from '../UI/s1Components/newClientCard';
import SearchClientBar from '../UI/s1Components/searchClientBar/searchClientBar';
import DividerWithCircle from '../UI/s1Components/dividerWithCircle';
import StepContainer from '../UI/stepContainer';

function StepOne() {
  return (
    <StepContainer>
      <Container sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <Grid container direction="column" spacing={4} mt={1}>
          <Grid item>
            <SearchClientBar />
          </Grid>
          <Grid item>
            <DividerWithCircle />
          </Grid>
          <Grid item>
            <Box sx={{
              m: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
            }}
            >
              <NewClientCard />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StepContainer>
  );
}
export default StepOne;
