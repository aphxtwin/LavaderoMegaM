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
  open, owners = '', vehicleDetails, submitDirectly, clienteId,
}) {
  const dispatch = useDispatch();

  const handleVehicleScenario = async (type) => {
    const payload = {
      details: { vehicleDetails },
      type,
    };
    if (submitDirectly) {
      // fetches vehicle api directly
      // You can perform the fetch operation here based on the type
      try {
        const vehicleId = vehicleDetails.vehiculoId;
        const response = await fetch('/api/vehicle/handle-existent-vehicle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clienteId, vehicleId, action: type }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);
      } catch (error) {
        console.error('API Error:', error);
      }
    }
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
        <Button sx={buttonStyle} onClick={() => handleVehicleScenario('sharedVehicleScenario')}>
          Vehiculo Compartido
        </Button>
        <Button sx={buttonStyle} onClick={() => handleVehicleScenario('ownershipTransferScenario')} autoFocus>
          Nuevo Titular
        </Button>
      </DialogActions>
    </Dialog>
  );
}

HandleVehicleAlreadyExists.propTypes = {
  open: PropTypes.bool.isRequired,
  owners: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  vehicleDetails: PropTypes.object.isRequired,
};
export default HandleVehicleAlreadyExists;
