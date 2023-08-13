/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function AddButton({ addServicio = '', onAddClient }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route) => {
    handleClose();
    router.push(route);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, left: 16 }}>
      <Tooltip title="Añade un nuevo servicio o cliente">
        <Fab
          sx={
              {
                backgroundColor: 'rgba(47, 56, 66, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(57, 66, 76, 1)',
                },
                width: '60px',
                height: '60px',
              }
          }
          aria-label="add"
          onClick={handleClick}
        >
          <AddIcon sx={{ color: 'white' }} />
        </Fab>
      </Tooltip>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '.MuiPaper-root': {
            color: 'white',
            padding: '0.4rem',
            backgroundColor: 'rgba(47, 56, 66, 1)',
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(addServicio)}>
          <AddTaskIcon />
          <Box sx={{ marginLeft: '5%' }}>
            Nuevo Servicio
          </Box>
        </MenuItem>
        <MenuItem onClick={onAddClient}>
          <PersonAddIcon />
          <Box sx={{ marginLeft: '5%' }}>
            Nuevo Cliente
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}

AddButton.propTypes = {
  addServicio: PropTypes.string,
  onAddClient: PropTypes.func.isRequired,
};
export default AddButton;
