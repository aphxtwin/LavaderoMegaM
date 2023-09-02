import React, {useState} from 'react';
import { TextField, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function PatenteTextField({
  patenteValue,
  handleChange,
  handleBlur,
  touched,
  errors,
  onPlateExistenceChecked, // This callback will inform the parent about the check's result
}) {
  const [isChecking, setIsChecking]= useState(false);

  async function checkPlateExistence(patente) {
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
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsChecking(false);
    }
  }
  return (
    <TextField
      name="patente"
      label="Patente"
      value={patenteValue}
      InputProps={{
        maxLength: 7,
        style: { textTransform: 'uppercase' },
        startAdornment: isChecking ? (
          <InputAdornment position="start">
            <CircularProgress size={30} sx={{ color: 'black' }} />
          </InputAdornment>
        ) : null,
      }}
      onChange={handleChange}
      disabled={isChecking}
      onBlur={(e) => {
        handleBlur(e);
        checkPlateExistence(e.target.value);
      }}
      error={touched.patente && Boolean(errors.patente)}
      helperText={touched.patente && errors.patente}
    />
  );
}
