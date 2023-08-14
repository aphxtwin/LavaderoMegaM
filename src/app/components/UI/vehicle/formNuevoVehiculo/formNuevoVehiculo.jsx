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
} from '@mui/material';
import { TipoVehiculo, Marca } from '@prisma/client';
import { useDispatch } from 'react-redux'
import { addVehicle } from '@/app/redux/slices/vehicleSlice';

function FormNuevoVehiculo() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState({ text: '', success: true });

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

  const handleSubmit = async (values, { resetForm }) => {
    const formData = { ...values };
    dispatch(addVehicle(formData))
  };


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

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="marca">Marca</InputLabel>
              <Select
                name="marca"
                label="Marca"
                value={values.marca}
                onChange={handleChange}
                labelId="marca"
              >
                {Object.values(Marca).map((marca) => (
                  <MenuItem key={marca} value={marca}>{marca}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
          {message.text && (
            <Box
              sx={{
                backgroundColor: message.success ? '#4CAF50' : '#E57373',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                marginTop: '10px',
              }}
            >
              {message.text}
            </Box>
          )}
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

