import React, { useState, useEffect } from 'react';
import {
  Grid, Card, Typography, CardContent, Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import AddCarCard from './addCarCard/cardAddVehicle';
import SkeletonAddCar from './addCarCard/skeletonAddCar';
import getVehiculosByClienteId from './actions';

export default function VehicleCars() {
  const clienteId = useSelector((state) => state.client.clientId);
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehiculos() {
      if (clienteId) {
        const data = await getVehiculosByClienteId(clienteId);
        setVehiculos(data);
        setLoading(false);
      }
    }
    fetchVehiculos();
  }, [clienteId]);
  return (
    <Box p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <AddCarCard />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          {loading ? (
          // Render Skeleton for each anticipated vehicle
            Array.from({ length: 3 }).map((_, idx) => (
              <Box mb={2} key={idx}>
                <SkeletonAddCar />
              </Box>
            ))
          )
            : (
              vehiculos.map((vehiculo) => (
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
              ))
            )}
        </Grid>
      </Grid>
    </Box>
  );
}
