import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Slide,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import PropTypes from 'prop-types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { resetVehicles } from '../../../../redux/slices/vehicleSlice';
import ClientForm from './clientForm';
import theme from '../../loginForm/theme';

function ClientDialog({
  showClientForm, toggleClientForm, clientFormTextButton = 'Agregar Nuevo Cliente',
}) {
  // Dialog that wraps the Client form. For reusability puposes
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    toggleClientForm();
    dispatch(resetVehicles());
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={showClientForm} onClose={handleDialogClose} fullWidth maxWidth="md" fullScreen TransitionComponent={Transition}>
        <DialogTitle>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <PersonAddIcon sx={{ width: '40px', height: '40px' }} />
            <Typography variant="h4" component="div" color="primary">
              Agregar Nuevo Cliente
            </Typography>
            <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
              <IconButton onClick={handleDialogClose} color="inherit">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{
            mx: 'auto', my: 2, justifyContent: 'center', width: { md: '50%', xs: '100%' },
          }}
          >
            <ClientForm textButton={clientFormTextButton} />
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>

  );
}
ClientDialog.propTypes = {
  showClientForm: PropTypes.bool.isRequired,
  toggleClientForm: PropTypes.func.isRequired,
  clientFormTextButton: PropTypes.string,
};
ClientDialog.defaultProps = {
  clientFormTextButton: 'Agregar Nuevo Cliente',
};
export default ClientDialog;
