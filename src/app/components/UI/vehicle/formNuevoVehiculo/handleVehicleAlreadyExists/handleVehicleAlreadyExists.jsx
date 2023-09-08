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
import { useDispatch } from 'react-redux';
import { addVehicle } from '../../../../../redux/slices/vehicleSlice';
import { toggleDialogFormNuevoVehiculo } from '../../../../../redux/slices/uiSlice';

function HandleVehicleAlreadyExists({
  open, owners = '', vehicleDetails,
}) {
  const dispatch = useDispatch();
  const handleSharedVehicle = () => {
    const payload = {
      details: { vehicleDetails },
      type: 'sharedVehicleScenario',
    };
    dispatch(addVehicle(payload));
    dispatch(toggleDialogFormNuevoVehiculo());
  };

  const handleTransferVehicle = () => {
    const payload = {
      details: { vehicleDetails },
      type: 'ownershipTransferScenario',
    };
    dispatch(addVehicle(payload));
    dispatch(toggleDialogFormNuevoVehiculo());
  };
  const buttonStyle = {
    color: 'white',
  };
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <WarningIcon size={30} />
          Esta patente ya existe en el sistema
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ display: 'flex', justifyContent: 'center' }} id="alert-dialog-description">
          Este auto ya pertenece al cliente:
          {' '}
          <Typography variant="body1" fontWeight="bold" fontFamily="Monospace" px={2}>
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
  onClose: PropTypes.func.isRequired,
};
export default HandleVehicleAlreadyExists;
