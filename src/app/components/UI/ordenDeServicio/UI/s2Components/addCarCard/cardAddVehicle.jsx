import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddCarCard({ onClick }) {
  return (
    <Grid item xs={6} sm={6} md={2}>
      <Card sx={{ backgroundColor: 'black', color: 'white', alignItems:'center',height:'200px',display:'flex' }}>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item>
                <AddIcon style={{ fontSize: 40, color: 'white' }} />
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  Nuevo Vehiculo
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default AddCarCard;
