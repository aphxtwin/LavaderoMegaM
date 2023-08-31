import 'server-only';
import React from 'react';
import {
  Grid, Button, Container, Box,
} from '@mui/material';
import NewClientCard from '../UI/newClientCard';
import SearchClientBar from '../UI/searchClientBar/searchClientBar';
import DividerWithCircle from '../UI/dividerWithCircle';
import StepContainer from '../UI/stepContainer';

function StepOne() {
  return (
    <StepContainer>
      <Container sx={{
        height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <SearchClientBar />
          </Grid>
          <Grid item>
            <DividerWithCircle />
          </Grid>
          <Grid item>
            <Box sx={{
              m: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
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
