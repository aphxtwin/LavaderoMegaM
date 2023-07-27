import React, { useState } from 'react';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function AddButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, left: 16 }}>
      <Fab
        sx={
            {
              backgroundColor: 'rgba(47, 56, 66, 1)',
              '&:hover': {
                backgroundColor: 'rgba(57, 66, 76, 1)',
              },
            }
        }
        aria-label="add"
        onClick={handleClick}
      >
        <AddIcon sx={{ color: 'white' }} />
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
            '.MuiPaper-root': {
                color: 'white',
                padding: '0.5rem',
                backgroundColor: 'rgba(47, 56, 66, 1)',
            },
        }}
      >
        <MenuItem onClick={handleClose}>Nuevo Servicio</MenuItem>
        <MenuItem onClick={handleClose}>Nuevo Cliente</MenuItem>
      </Menu>
    </Box>
  );
}

export default AddButton;
