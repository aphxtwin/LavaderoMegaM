import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import PropTypes from 'prop-types';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CloseIcon from '@mui/icons-material/Close';
import FormNuevoVehiculo from './formNuevoVehiculo';
import theme from '../../loginForm/theme'; // You can customize the theme as needed

function DialogFormNuevoVehiculo({ open, onClose }) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <DriveEtaIcon sx={{ width: '40px', height: '40px' }} />
            <Typography variant="h4" component="div" color="primary">
              Agregar Nuevo Vehículo
            </Typography>
            <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
              <IconButton onClick={onClose} color="inherit">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormNuevoVehiculo />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

DialogFormNuevoVehiculo.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogFormNuevoVehiculo;
