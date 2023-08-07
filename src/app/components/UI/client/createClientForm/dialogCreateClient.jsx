import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  ThemeProvider,
} from '@mui/material';
import PropTypes from 'prop-types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClientForm from './clientForm';
import theme from '../../loginForm/theme';

function ClientDialog({ showClientForm, toggleClientForm }) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={showClientForm} onClose={toggleClientForm} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{}}>
            <PersonAddIcon sx={{ width: '40px', height: '40px' }} />
            <Typography variant="h4" component="div" color="primary">
              Agregar Nuevo Cliente
            </Typography>
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
