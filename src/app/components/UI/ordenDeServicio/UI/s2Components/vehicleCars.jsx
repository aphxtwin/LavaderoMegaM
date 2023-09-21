import React, { useState } from 'react';
import {
  Grid, Card, Typography, CardContent, Box, Dialog,
} from '@mui/material';
import useSWR from 'swr';
import AddCarCard from './addCarCard/cardAddVehicle';
import SkeletonAddCar from './addCarCard/skeletonAddCar';
import DialogFormNuevoVehiculo from '../../../vehicle/formNuevoVehiculo/dialogFormNuevoVehiculo';
import ErrorRefetch from '../errorRefetch';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDialogFormNuevoVehiculo } from '../../../../../redux/slices/uiSlice';

const fetcher = (url) => fetch(url).then((r) => r.json());
const errorStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1000,
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
function VehicleCars() {
  const dispatch = useDispatch();
  const clienteId = useSelector((state) => state.client.clientId);
  const dialogOpen = useSelector((state) => state.ui.showDialogFormNuevoVehiculo);
  
  const handleDialog = () => {
    dispatch(toggleDialogFormNuevoVehiculo());
  }
  
  const {
    data, error, isLoading, mutate,
  } = useSWR(
    clienteId ? `/api/vehicle/client-vehicles?clienteId=${clienteId}` : null,
    fetcher,
  );

  if (error) {
    return (
      <Box sx={errorStyles}>
        <ErrorRefetch onclick={() => mutate()} />
      </Box>
    );
  }

  return (
    <>
      <DialogFormNuevoVehiculo open={dialogOpen} onClose={handleDialog} submitDirectly={true} />
      <Box py={4} px={2}>
        <Grid container spacing={3}>
          <AddCarCard onClick={handleDialog} />
          {
                isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonAddCar />
                  ))
                ) : (
                  <>
                    {data.vehiculos.map((vehiculo) => (
                      <Grid item xs={6} sm={6} md={2} key={vehiculo.vehiculoId}>
                        <Card sx={{ heigth: '200px', p:1 }}>
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
    </>
  );
}
export default VehicleCars;
