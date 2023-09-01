import React, { useState } from 'react';
import {
  Formik, Form,
} from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material';
import { TipoVehiculo, Marca } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { addVehicle } from '../../../../redux/slices/vehicleSlice';

function FormNuevoVehiculo({ onSuccess }) {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    tipoDeVehiculo: Yup.string().required('El tipo de vehículo es obligatorio'),
    patente: Yup.string().required('La patente es obligatoria'),
    marca: Yup.string().required('La marca es obligatoria'),
    modelo: Yup.string().required('El modelo es obligatorio'),
    observaciones: Yup.string(),
  });

  const initialValues = {
    tipoDeVehiculo: '',
    patente: '',
    marca: '',
    modelo: '',
    observaciones: '',
  };
  async function checkPlateExistence(patente) {
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
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    try {
      const formData = { ...values };
      // Api fetch
      const plateResponse = await checkPlateExistence(formData.patente);

      if (plateResponse.exists) {
        setErrors({ patente: 'Esta patente ya existe en el sistema.' });
        return; // Return to prevent further actions.
      }
      const newVehicle = {
        tipoDeVehiculo: formData.tipoDeVehiculo,
        patente: formData.patente,
        marca: formData.marca,
        modelo: formData.modelo,
        observaciones: formData.observaciones,
      };

      dispatch(addVehicle(newVehicle));
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.error('Error:', e);
    }
  };
  const marcas = Object.values(Marca);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange, values, errors, touched,
      }) => (
        <Form>
          <Box sx={{
            my: 2, display: 'flex', flexDirection: 'column', gap: '2rem',
          }}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="vehicle-type">Tipo de Vehículo</InputLabel>
              <Select
                name="tipoDeVehiculo"
                label="Tipo de Vehículo"
                value={values.tipoDeVehiculo}
                onChange={handleChange}
                labelId="vehicle-type"
              >
                {Object.values(TipoVehiculo).map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="patente"
              label="Patente"
              value={values.patente}
              inputProps={{
                maxLength: 7,
                style: { textTransform: 'uppercase' },
              }}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase().slice(0, 7);
                handleChange(e);
              }}
              error={touched.patente && Boolean(errors.patente)}
              helperText={touched.patente && errors.patente}
            />
            <Autocomplete
              options={marcas}
              value={values.marca}
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: 'marca',
                    value: newValue || '', // use the newValue provided by the onChange function
                  },
                });
              }}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={touched.marca && Boolean(errors.marca)}
                  label="Marca"
                  variant="outlined"
                />
              )}
            />

            <TextField
              name="modelo"
              label="Modelo"
              value={values.modelo}
              onChange={handleChange}
              error={touched.modelo && Boolean(errors.modelo)}
              helperText={touched.modelo && errors.modelo}
            />
            <TextField
              name="observaciones"
              label="Observaciones"
              value={values.observaciones}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ my: 2 }} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Agregar vehículo
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default FormNuevoVehiculo;
// const handleSubmit = async (values, { resetForm }) => {
//   const formData = { ...values };
//   try {
//     const res = await fetch('/api/vehicle', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         tipoDeVehiculo: formData.tipoDeVehiculo,
//         patente: formData.patente,
//         marca: formData.marca,
//         modelo: formData.modelo,
//         observaciones: formData.observacion,
//       }),
//     });

//     if (res.ok) {
//       setMessage({ text: 'El vehículo se ha guardado exitosamente', success: true });
//       resetForm();
//     } else {
//       setMessage({ text: 'Ya existe un vehículo con esta información', success: false });
//     }
//   } catch (error) {
//     setMessage({ text: 'Error al enviar el formulario', success: false });
//   }
// };
