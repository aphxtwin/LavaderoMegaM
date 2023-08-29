import React from 'react';
import {
  Box, Grid, Typography,
} from '@mui/material';
import SearchClientBar from '../UI/searchClientBar/searchClientBar';
import NewClientCard from '../UI/newClientCard';
import StepContainer from '../UI/stepContainer';

function StepOne() {
  return (
    <StepContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item sx={{ marginTop: '3%' }} xs={12} md={10}>
          <SearchClientBar />
        </Grid>
        <Box sx={{
          width: '90%', height: '3px', backgroundColor: '#DDDDDD', position: 'relative', mt: 5, marginBottom: '4%',
        }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0 10px',
            }}
          >
            O
          </Typography>
        </Box>
        <Grid item xs={12} md={6}>
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '5%',
          }}
          >
            <NewClientCard />
          </Box>
        </Grid>
      </Grid>
    </StepContainer>

  );
}

export default StepOne;
