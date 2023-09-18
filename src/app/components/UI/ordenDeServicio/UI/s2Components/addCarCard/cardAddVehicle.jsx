import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddCarCard({ onClick }) {
  return (
    <Card sx={{ backgroundColor: 'black', color: 'white', width: 240,height:'100%' }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <AddIcon style={{ fontSize: 40, color: 'white' }} />
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center">
                Añadir Nuevo Vehiculo
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default AddCarCard;
