import 'server-only';
import React from 'react';
import {
  Grid, Box, Typography, Button, Container
} from '@mui/material';
import SearchClientBar from '../UI/searchClientBar/searchClientBar';
import DividerWithCircle from '../UI/dividerWithCircle';
import StepContainer from '../UI/stepContainer';

function StepOne() {
  return (
    <StepContainer>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <SearchClientBar />
        </Grid>
        <Grid item>
          <DividerWithCircle />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            New client card
          </Button>
        </Grid>
      </Grid>
    </StepContainer>
  );
}
export default StepOne;
