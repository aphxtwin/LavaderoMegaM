import React from 'react';
import {
  Button, ThemeProvider, Typography, Badge
} from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import theme from './theme';

function ButtonAddCar({ onClick }) {
  const vehicles = useSelector(state => state.vehicle.vehicles);
  const vehicleCount = vehicles.length;

  return (
    <ThemeProvider theme={theme}>
      <Badge
        badgeContent={vehicleCount}
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        
        invisible={vehicleCount === 0} // hide when count is 0
      >
      <Button
        variant='outlined'
        onClick={onClick}
      >
        <Image height={50} width={60} src="/images/addCarIcon.svg" alt="add car" />
        <Typography variant="button">
          Añadir vehículo
        </Typography>
      </Button>
      </Badge>
    </ThemeProvider>
  );
}
ButtonAddCar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonAddCar;
