import React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import WarningIcon from '@mui/icons-material/Warning';
import PropTypes from 'prop-types';

function HandleVehicleAlreadyExists({ open, owners='' }) {
  const buttonStyle = {
    color: 'white',
  };
  const handleSharedVehicle = () => {
    console.log('Vehiculo compartido');
  };

  const handleTransferVehicle = () => {
    console.log('Vehiculo transferido');
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center' }}>
          <WarningIcon size={30}/>
          Esta patente ya existe en el sistema
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{display:'flex', justifyContent:'center'}} id="alert-dialog-description">
          Este auto ya pertenece al cliente: 
          {' '}
          <Typography variant="body1" fontWeight={'bold'} fontFamily="Monospace" px={2}>
            {owners} 
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={buttonStyle} onClick={handleSharedVehicle}>
          Vehiculo Compartido
        </Button>
        <Button sx={buttonStyle} onClick={handleTransferVehicle} autoFocus>
          Nuevo Dominio
        </Button>
      </DialogActions>
    </Dialog>
  );
}
HandleVehicleAlreadyExists.propTypes = {
  open: PropTypes.bool.isRequired,
};
export default HandleVehicleAlreadyExists;
