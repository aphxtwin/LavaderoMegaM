import React from 'react';
import {
  Grid, Card, Typography, CardContent, Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import AddCarCard from './addCarCard/cardAddVehicle';
import SkeletonAddCar from './addCarCard/skeletonAddCar';

const fetcher = url => fetch(url).then(r => r.json());
export default function VehicleCars() {
  const clienteId = useSelector((state) => state.client.clientId);
  const { data, error, isLoading } = useSWR(
        clienteId ? `/api/vehicle/client-vehicles?clienteId=${clienteId}` : null, 
        fetcher,
    );
  console.log(data);
  if (isLoading) {
    Array.from({ length: 3 }).map((_, idx) => (
      <Box mb={2} key={idx}>
        <SkeletonAddCar />
      </Box>
    ));
  }
  if (error) {
    return <Box>Algo salio mal :/</Box>;
  }

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <AddCarCard />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          { data?.vehiculos.map((vehiculo) => (
            <Card key={vehiculo.vehiculoId}>
              <CardContent>
                <Typography variant="h6">
                  {vehiculo.marca}
                  {' '}
                  {vehiculo.modelo}
                </Typography>
                <Typography variant="body2">
                  Type:
                  {' '}
                  {vehiculo.tipoDeVehiculo}
                </Typography>
                <Typography variant="body2">
                  Patente:
                  {' '}
                  {vehiculo.patente}
                </Typography>
                <Typography variant="body2">
                  Observations:
                  {' '}
                  {vehiculo.observaciones}
                </Typography>
                <Typography variant="caption">
                  Created At:
                  {' '}
                  {new Date(vehiculo.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
