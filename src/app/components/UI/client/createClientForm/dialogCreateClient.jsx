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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import ClientForm from './clientForm';
import theme from '../../loginForm/theme';

function ClientDialog({ showClientForm, toggleClientForm }) {
  // Dialog that wraps the Client form. For reusability puposes
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={showClientForm} onClose={toggleClientForm} fullWidth maxWidth="md">
        <DialogTitle>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <PersonAddIcon sx={{ width: '40px', height: '40px' }} />
            <Typography variant="h4" component="div" color="primary">
              Agregar Nuevo Cliente
            </Typography>
            <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
              <IconButton onClick={toggleClientForm} color="inherit">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <ClientForm />
        </DialogContent>
      </Dialog>
    </ThemeProvider>

  );
}
ClientDialog.propTypes = {
  showClientForm: PropTypes.bool.isRequired,
  toggleClientForm: PropTypes.func.isRequired,
};
export default ClientDialog;
