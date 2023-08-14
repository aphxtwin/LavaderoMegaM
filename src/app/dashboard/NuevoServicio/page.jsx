'use client';

import React from 'react';
import { Grid, Box } from '@mui/material';
import OrdenDeServicioContainer from '../../components/UI/ordenDeServicio/Layout/ordenDeServicioContainer';
import SearchClientBar from '../../components/UI/ordenDeServicio/UI/searchClientBar';

export default function NuevoServicio() {
  return (
    <OrdenDeServicioContainer>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item sm={12} md={12}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', padding:'5rem'}}>
              <SearchClientBar/>
            </Box>
          </Grid>
          <Grid item sm={12} md={12}>
            item
          </Grid>
        </Grid>
    </Box>
    </OrdenDeServicioContainer>
  );
}