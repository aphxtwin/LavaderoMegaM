import React from 'react';
import {
  Button, ThemeProvider, Typography,
} from '@mui/material';
import Image from 'next/image';
import theme from './theme';

function AddVehicleButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{
          width: '155px',
          height: '120px',
          background: '#FFFFFF',
          border: '2px dashed #405779',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          top: '0px',
        }}
      >
        <Image height={60} width={70} src="/images/addCarIconGray.svg" alt="add car" />
        <Typography sx={{ marginTop: '0.1rem' }} variant="button">
          Añadir vehículo
        </Typography>
      </Button>
    </ThemeProvider>
  );
}

export default AddVehicleButton;
