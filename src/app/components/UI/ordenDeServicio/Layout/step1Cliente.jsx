import 'server-only'
import React from 'react';
import {
  Box, Grid, Typography, Slide,
} from '@mui/material';
import SearchClientBar from '../UI/searchClientBar/searchClientBar';

import StepContainer from '../UI/stepContainer';

function StepOne() {
  return (
    <StepContainer>
      <Grid container direction="column">
        <Grid item sx={{ marginTop: '3%', px: 50 }} xs={12} md={10}>
          <SearchClientBar />
        </Grid>
      </Grid>
    </StepContainer>

  );
}

export default StepOne;
