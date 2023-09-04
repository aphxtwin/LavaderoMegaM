import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

export default function PatenteTextField({
  patenteValue,
  handleChange,
  handleBlur,
  touched,
  errors,
  onPlateExistenceChecked, // This callback will inform the parent about the check's result
}) {
  const [isChecking, setIsChecking] = useState(false);
  const [success, setSuccess] = useState(false);
  async function checkPlateExistence(patente) {
    setSuccess(false);
    const patenteLenght = patente.length;
    // avoids triggering by mistake the data fetching
    if (patenteLenght > 5) {
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
        onPlateExistenceChecked(result.exists); // Informing parent about the result
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
      placeholder="Patente"
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
        checkPlateExistence(e.target.value);
      }}
      error={touched.patente && Boolean(errors.patente)}
      helperText={success ? 'Esta patente no existe aun en el sistema' : touched.patente && errors.patente}
      FormHelperTextProps={success ? { style: { color: 'green' } } : {}}
    />
  );
}
