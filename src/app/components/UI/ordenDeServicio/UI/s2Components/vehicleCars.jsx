import React from 'react';
import {
  Grid, Card, Typography, CardContent, Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import AddCarCard from './addCarCard/cardAddVehicle';
import SkeletonAddCar from './addCarCard/skeletonAddCar';

const fetcher = (url) => fetch(url).then((r) => r.json());
export default function VehicleCars() {
  const clienteId = useSelector((state) => state.client.clientId);
  const { data, error, isLoading } = useSWR(
    clienteId ? `/api/vehicle/client-vehicles?clienteId=${clienteId}` : null,
    fetcher,
  );

  if (error) {
    return <Box>Algo salio mal :/</Box>;
  }

  return (
    <Box py={4} px={2}>
      <Grid container spacing={3}>
        <AddCarCard />
        {
            isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonAddCar />
              ))
            ) : (
              <>
                {data.vehiculos.map((vehiculo) => (
                  <Grid item xs={6} sm={6} md={2} key={vehiculo.vehiculoId}>
                    <Card sx={{heigth:'200px'}}>
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
                  </Grid>
                ))}
              </>
            )
        }
      </Grid>
    </Box>
  );
}
