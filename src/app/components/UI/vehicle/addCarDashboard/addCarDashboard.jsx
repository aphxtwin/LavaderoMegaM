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
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import DialogFormNuevoVehiculo from '../formNuevoVehiculo/dialogFormNuevoVehiculo';

function AddCarDashboard({ showCarDashboard, toggleCarDashboard }) {
  const [showDialogFormNuevoVehiculo, setShowDialogFormNuevoVehiculo] = useState(false);
  const vehicles = useSelector(state => state.vehicle.vehicles);
  const handleDialogForm = () => {
    setShowDialogFormNuevoVehiculo(!showDialogFormNuevoVehiculo);
  };
  const styleCell = {
    borderBottom: '1px solid rgba(159, 159, 159, 1)', 
    borderTop: '1px solid rgba(159, 159, 159, 1)', 
    padding: '10px' 
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
          <IconButton color="inherit" onClick={toggleCarDashboard}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={toggleCarDashboard} color="inherit">
            <CloseIcon />
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
            {vehicles.map(vehicle => (
                <TableRow key={vehicle.patente}>
                    <TableCell sx={styleCell}>{vehicle.patente}</TableCell>
                    <TableCell sx={styleCell}>{vehicle.tipoDeVehiculo}</TableCell>
                    <TableCell sx={styleCell}>{vehicle.marca}</TableCell>
                    <TableCell sx={styleCell}>{vehicle.modelo}</TableCell>
                    <TableCell sx={styleCell}>{vehicle.observaciones}</TableCell>
                </TableRow>
            ))}
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
