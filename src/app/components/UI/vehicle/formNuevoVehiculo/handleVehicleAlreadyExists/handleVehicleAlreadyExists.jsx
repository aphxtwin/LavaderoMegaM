import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import WarningIcon from '@mui/icons-material/Warning';

function HandleVehicleAlreadyExists({ open }) {
  const buttonStyle = {
    color:'white'
  }
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <WarningIcon style={{ marginRight: '10px' }} />
        Esta patente ya existe en el sistema
      </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          
          Este auto ya pertenece a
          {' '}
          .
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={buttonStyle}>
          Auto Compartido
        </Button>
        <Button sx={buttonStyle} autoFocus>
          Nuevo Dominio
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HandleVehicleAlreadyExists;
