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
import PatenteTextField from './patenteTextField';

/*
  Form Nuevo vehiculo doesn't create a row in vehiculo table, but rather
  it stores the client data in redux state to be sent after
  altogether with the data of the client(since the client is the center figure of the process)
  PatenteTextField is a component that makes a fetch checking dynamically the
  existence or not of the plate; If exists asks:'nuevo cliente or transferencia de dominio'.
  if it doesn't exist just dispatch the vehicle or vehicles normally
*/
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

  const handlePlateExistenceCheck = (exists, setFieldErrorFn) => {
    if (exists) {
      // Show error or dialog as per your requirements
      setFieldErrorFn('patente','esta patente ya existe en el sistema');
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = { ...values };

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
        handleChange, values, errors, touched, handleBlur, setFieldError,
      }) => (
        <Form>
          <Box sx={{
            my: 2, display: 'flex', flexDirection: 'column', gap: '2rem',
          }}
          >
            <PatenteTextField
              patenteValue={values.patente}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              onPlateExistenceChecked={(exists) => handlePlateExistenceCheck(exists, setFieldError)}
            />
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
