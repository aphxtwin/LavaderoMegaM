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
import DialogFormNuevoVehiculo from '../formNuevoVehiculo/dialogFormNuevoVehiculo';

function AddCarDashboard({ showCarDashboard, toggleCarDashboard }) {
  const [showDialogFormNuevoVehiculo, setShowDialogFormNuevoVehiculo] = useState(false);

  const handleDialogFormOpen = () => {
    setShowDialogFormNuevoVehiculo(true);
  };
  const handleDialogFormClose = () => {
    setShowDialogFormNuevoVehiculo(false);
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
            onClick={handleDialogFormOpen}
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
              <TableCell sx={{ borderBottom: '1px solid rgba(159, 159, 159, 1)', borderTop: '1px solid rgba(159, 159, 159, 1)', padding: '10px' }}>Patente</TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(159, 159, 159, 1)', borderTop: '1px solid rgba(159, 159, 159, 1)', padding: '10px' }}>Tipo de Vehículo</TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(159, 159, 159, 1)', borderTop: '1px solid rgba(159, 159, 159, 1)', padding: '10px' }}>Marca</TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(159, 159, 159, 1)', borderTop: '1px solid rgba(159, 159, 159, 1)', padding: '10px' }}>Modelo</TableCell>
              <TableCell sx={{ borderBottom: '1px solid rgba(159, 159, 159, 1)', borderTop: '1px solid rgba(159, 159, 159, 1)', padding: '10px' }}>Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody />
        </Table>
        <DialogFormNuevoVehiculo
          open={showDialogFormNuevoVehiculo}
          onClose={handleDialogFormClose}
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
