import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDialogFormNuevoVehiculo } from '../../../../redux/slices/uiSlice';
import DialogFormNuevoVehiculo from '../formNuevoVehiculo/dialogFormNuevoVehiculo';

function AddCarDashboard({ showCarDashboard, toggleCarDashboard }) {
  const dispatch = useDispatch();
  const showDialogFormNuevoVehiculo = useSelector((state) => state.ui.showDialogFormNuevoVehiculo);
  const vehicleDetails = useSelector((state) => state.vehicle.vehicles);
  const handleDialogForm = () => {
    dispatch(toggleDialogFormNuevoVehiculo());
  };
  const styleCell = {
    borderBottom: '1px solid rgba(159, 159, 159, 1)',
    borderTop: '1px solid rgba(159, 159, 159, 1)',
    padding: '10px',
  };
  return (
    <Dialog
      open={showCarDashboard}
      onClose={toggleCarDashboard}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ pb: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={toggleCarDashboard} color="inherit">
            <CloseIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleCarDashboard}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="div" color="primary" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Agrega un nuevo vehículo
          </Typography>
          <Button
            onClick={handleDialogForm}
            sx={{
              background: '#2F3842',
              borderRadius: '3px',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '16px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              color: '#FFFFFF',
              padding: '10px 25px',
            }}
          >
            Añadir+
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 0, marginBottom: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styleCell}>Patente</TableCell>
              <TableCell sx={styleCell}>Tipo de Vehículo</TableCell>
              <TableCell sx={styleCell}>Marca</TableCell>
              <TableCell sx={styleCell}>Modelo</TableCell>
              <TableCell sx={styleCell}>Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleDetails.map((item) => {
              const vehicle = item.vehicleDetails;
              return (
                <TableRow key={vehicle.vehiculoId}>
                  <TableCell sx={styleCell}>{vehicle.patente}</TableCell>
                  <TableCell sx={styleCell}>{vehicle.tipoDeVehiculo}</TableCell>
                  <TableCell sx={styleCell}>{vehicle.marca}</TableCell>
                  <TableCell sx={styleCell}>{vehicle.modelo}</TableCell>
                  <TableCell sx={styleCell}>{vehicle.observaciones}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <DialogFormNuevoVehiculo
          open={showDialogFormNuevoVehiculo}
          onClose={handleDialogForm}
        />
      </DialogContent>
    </Dialog>
  );
}

AddCarDashboard.propTypes = {
  showCarDashboard: PropTypes.bool.isRequired,
  toggleCarDashboard: PropTypes.func.isRequired,
};

export default AddCarDashboard;
