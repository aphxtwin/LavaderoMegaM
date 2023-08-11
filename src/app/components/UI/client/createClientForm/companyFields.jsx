/* eslint-disable react/prop-types */
import React from 'react';
import { Field } from 'formik';
import {
  TextField, Box, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { CondicionIva } from '@prisma/client';

function EmpresaForm({
  values, handleChange, touched, errors, formatCuit,
}) {
  return (
    <>
      <Box>
        <Field
          as={TextField}
          name="nombreCompleto"
          label="Nombre de la Empresa"
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.nombreCompleto && !!errors.nombreCompleto}
          helperText={touched.nombreCompleto && errors.nombreCompleto}
          required
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Field
          as={TextField}
          name="cuit"
          label="CUIT"
          variant="outlined"
          fullWidth
          value={formatCuit(values.cuit)}
          onChange={(event) => {
            const formattedValue = formatCuit(event.target.value);
            handleChange({
              target: {
                name: 'cuit',
                value: formattedValue,
              },
            });
          }}
          error={touched.cuit && !!errors.cuit}
          helperText={touched.cuit && errors.cuit}
          required
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="iva-condition">Condición IVA</InputLabel>
          <Select
            name="condicionIva"
            label="Condición IVA"
            value={values.condicionIva}
            onChange={handleChange}
            labelId="iva-condition"
          >
            <MenuItem value={CondicionIva.ConsumidorFinal}>Consumidor Final</MenuItem>
            <MenuItem value={CondicionIva.Monotributista}>Monotributista</MenuItem>
            <MenuItem value={CondicionIva.ResponsableInscripto}>Responsable inscripto</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ my: 2 }}>
        <Field
          as={TextField}
          name="telefono"
          label="Teléfono"
          variant="outlined"
          type="tel"
          InputProps={{
            inputMode: 'numeric',
            maxLength: 10,
          }}
          fullWidth
          value={values.telefono}
          onChange={(event) => {
            const numericValue = event.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
            const formattedValue = numericValue.slice(0, 13); // Limitar a 10 caracteres
            handleChange({
              target: {
                name: 'telefono',
                value: formattedValue,
              },
            });
          }}
          error={touched.telefono && !!errors.telefono}
          helperText={touched.telefono && errors.telefono}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Field
          as={TextField}
          name="email"
          label="Correo electrónico"
          variant="outlined"
          type="email"
          fullWidth
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />
      </Box>
    </>
  );
}

export default EmpresaForm;
