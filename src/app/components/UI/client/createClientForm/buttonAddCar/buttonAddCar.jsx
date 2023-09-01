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
        variant='outlined'
        onClick={onClick}
      >
        <Image height={60} width={70} src="/images/addCarIcon.svg" alt="add car" />
        <Typography variant="button">
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
