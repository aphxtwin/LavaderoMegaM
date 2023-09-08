import React from 'react';
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
  Button,
  TableBody,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import AddCarButton from './addCarButton';
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
          <AddCarButton title="Añadir+" onClick={handleDialogForm} />
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
            {vehicleDetails.map((item) => (
              <TableRow key={item.vehicleDetails.vehiculoId}>
                <TableCell sx={styleCell}>{item.vehicleDetails.patente}</TableCell>
                <TableCell sx={styleCell}>{item.vehicleDetails.tipoDeVehiculo}</TableCell>
                <TableCell sx={styleCell}>{item.vehicleDetails.marca}</TableCell>
                <TableCell sx={styleCell}>{item.vehicleDetails.modelo}</TableCell>
                <TableCell sx={styleCell}>{item.vehicleDetails.observaciones}</TableCell>
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
