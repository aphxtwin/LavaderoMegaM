/* eslint-disable no-console */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { CondicionIva } from '@prisma/client';

function ClientForm() {
  const validationSchema = Yup.object().shape({
    nombreCompleto: Yup.string().required('El nombre es obligatorio'),
    documento: Yup.string().required('El documento es obligatorio').max(8, 'Máximo 8 caracteres'),
    email: Yup.string().email('Formato de correo inválido'),
    condicionIva: Yup.string().required('La condición IVA es obligatoria'),
    cuit: Yup.string().max(11, 'Máximo 11 caracteres'),
    telefono: Yup.string().required('El teléfono es obligatorio'),
    esCuentaCorriente: Yup.boolean(),
  });

  const initialValues = {
    nombreCompleto: '',
    documento: '',
    email: '',
    condicionIva: CondicionIva.ConsumidorFinal,
    cuit: '',
    telefono: '',
    esCuentaCorriente: false,
  };

  const handleSubmit = async (values) => {
    const formData = { ...values };

    try {
      const res = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCompleto: formData.nombreCompleto,
          documento: formData.documento,
          email: formData.email,
          telefono: formData.telefono,
          cuit: formData.cuit,
          condicionIva: formData.condicionIva,
          esCuentaCorriente: formData.esCuentaCorriente,
        }),
      });

      if (res.ok) {
        console.log('El cliente se ha guardado exitosamente');
      } else {
        console.log('Hubo un error al guardar el cliente');
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        isSubmitting, handleChange, values, errors, touched,
      }) => (
        <Form>
          <Box>
            <Field
              as={TextField}
              name="nombreCompleto"
              label="Nombre Completo"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.nombreCompleto && !!errors.nombreCompleto}
              helperText={touched.nombreCompleto && errors.nombreCompleto}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Field
              as={TextField}
              name="documento"
              label="Documento"
              variant="outlined"
              type="number"
              InputProps={{
                inputMode: 'numeric',
                maxLength: 8,
              }}
              fullWidth
              error={touched.documento && !!errors.documento}
              helperText={touched.documento && errors.documento}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Field
              as={TextField}
              name="cuit"
              label="CUIT"
              variant="outlined"
              fullWidth
              error={touched.cuit && !!errors.cuit}
              helperText={touched.cuit && errors.cuit}
            />
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
              error={touched.telefono && !!errors.telefono}
              helperText={touched.telefono && errors.telefono}
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
              name="email"
              label="Correo electrónico"
              variant="outlined"
              type="email"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <FormControlLabel
              label="¿Cuenta Corriente?"
              control={(
                <Switch
                  checked={values.esCuentaCorriente}
                  onChange={handleChange}
                  name="esCuentaCorriente"
                  color="primary"
                />
                )}
            />
          </Box>
          <Box sx={{ my: 2 }} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Agregar cliente'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default ClientForm;
