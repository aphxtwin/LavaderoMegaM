import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@mui/material';

function CarReadyCheckbox({ car, plate, client }) {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setChecked(false);
    setOpen(false);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'Car ready checkbox' }}
      />
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar salida de auto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Desea confirmar la salida del auto ${car} patente ${plate} del cliente ${client}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
CarReadyCheckbox.propTypes = {
  car: PropTypes.string.isRequired,
  plate: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
};
export default CarReadyCheckbox;
