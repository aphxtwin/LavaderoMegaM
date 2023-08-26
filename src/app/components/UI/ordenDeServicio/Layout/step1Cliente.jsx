import React from 'react';
import {
  Box,
} from '@mui/material';
import SearchClientBar from '../UI/searchClientBar';
import NewClientCard from '../UI/newClientCard';
import StepContainer from '../UI/stepContainer';

function StepOne() {
  return (
    <StepContainer>
        <Box sx={{ marginTop:'5%'}}>
          <SearchClientBar />
        </Box>
        <Box sx={{width:'100%',height:'1px', marginTop:'2%'}}>
        </Box>
        <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center', width:'100%', marginTop:'5%'}}>
          <NewClientCard />
        </Box>
    </StepContainer>

  );
}

export default StepOne;
