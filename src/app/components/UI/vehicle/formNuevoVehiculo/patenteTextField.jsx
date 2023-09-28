/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';
import ErrorIcon from '@mui/icons-material/Error';

export default function PatenteTextField({
  patenteValue,
  handleChange,
  handleBlur,
  touched,
  error,
  // eslint-disable-next-line react/prop-types
  validationSchema,
  onPlateExistenceChecked, // This callback will inform the parent about the check's result
}) {
  const [isChecking, setIsChecking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const vehiclesInRedux = useSelector((state) => state.vehicle.vehicles);

  function checkInternal(patente) {
    const normalizedPatente = patente.toLowerCase();
    const existingVehicle = vehiclesInRedux.find(
      (vehicle) => vehicle.vehicleDetails.patente.toLowerCase() === normalizedPatente,
    );
    setInternalError(!!existingVehicle);
    return !!existingVehicle;
  }

  async function checkPlateExistence(patente, schemaValidation) {
    setSuccess(false);
    const patenteLenght = patente.length;
    const isValidPatente = schemaValidation.fields.patente.isValidSync(patente);
    // avoids triggering by mistake the data fetching
    if (patenteLenght >= 5 && isValidPatente) {
      const isInternallyExisting = checkInternal(patente);
      if (isInternallyExisting) {
        return; // Exit early if it exists internally
      }
      try {
        setIsChecking(true);
        const response = await fetch('/api/vehicle/check-plate-existence', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patente,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        onPlateExistenceChecked(
          result.exists,
          result.vehicle,
          result.owners,
        ); // Informing parent about the result
        if (result.exists === false) {
          setSuccess(true);
        }
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsChecking(false);
      }
    }
  }
  const renderStartAdornment = () => {
    if (internalError) {
      return (
        <InputAdornment position="start">
          <ErrorIcon size={30} />
        </InputAdornment>
      );
    }
    if (isChecking) {
      return (
        <InputAdornment position="start">
          <CircularProgress size={30} />
        </InputAdornment>
      );
    }
    if (success) {
      return (
        <InputAdornment position="start">
          <CheckIcon sx={{ borderRadius: '25px', backgroundColor: 'green', color: 'white' }} />
        </InputAdornment>
      );
    }
    return null;
  };
  return (
    <TextField
      name="patente"
      required
      label="Patente"
      value={patenteValue}
      InputProps={{
        maxLength: 7,
        style: { textTransform: 'uppercase' },
        startAdornment: renderStartAdornment(),
      }}
      onChange={handleChange}
      disabled={isChecking}
      onBlur={(e) => {
        handleBlur(e);
        checkPlateExistence(e.target.value, validationSchema);
      }}
      error={touched.patente && Boolean(error.patente)}
      helperText={success ? 'Esta patente no existe aun en el sistema' : internalError ? 'Esta patente ya está pendiente para agregar' : touched.patente && error.patente}
      FormHelperTextProps={success ? { style: { color: 'green' } } : internalError ? { style: { color: 'gray' } } : {}}

    />
  );
}
PatenteTextField.propTypes = {
  patenteValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    patente: PropTypes.bool,
  }).isRequired,
  error: PropTypes.shape({
    patente: PropTypes.string,
  }).isRequired,
  onPlateExistenceChecked: PropTypes.func.isRequired,
};
