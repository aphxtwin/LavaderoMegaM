import React from 'react';
import {
  Button, ThemeProvider, Typography,
} from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import theme from './theme';

function ButtonAddCar({ onClick }) {
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
        onClick={onClick}
      >
        <Image height={60} width={70} src="/images/addCarIcon.svg" alt="add car" />
        <Typography sx={{ marginTop: '0.1rem' }} variant="button">
          Añadir vehículo
        </Typography>
      </Button>
    </ThemeProvider>
  );
}
ButtonAddCar.propTypes = {
  onClick: PropTypes.bool.isRequired,
};
export default ButtonAddCar;
