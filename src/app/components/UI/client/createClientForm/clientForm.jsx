/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
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
  const [message, setMessage] = useState({ text: '', success: true });

  const validationSchema = Yup.object().shape({
    nombreCompleto: Yup.string().required('El nombre es obligatorio'),
    documento: Yup.string().test('documentoOcuit', 'Ingresa DNI o CUIT', (value) => {
      const cuitValue = value; // Obtén el valor de "cuit"
      return !!(value || cuitValue); // Al menos uno debe tener valor
    }),
    email: Yup.string().email('Formato de correo inválido'),
    condicionIva: Yup.string().required('La condición IVA es obligatoria'),
    cuit: Yup.string()
      .when('condicionIva', {
        is: (value) => value === CondicionIva.ResponsableInscripto,
        then: () => Yup.string()
          .required('El CUIT es obligatorio')
          .matches(/^[0-9]{2}-[0-9]{8}-[0-9]{1}$/, 'El CUIT debe tener 11 dígitos y el formato XX-XXXXXXXX-X'),
      }),
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
    formData.cuit = formData.cuit.replace(/\D/g, '-');

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
        setMessage({ text: 'El cliente se ha guardado exitosamente', success: true });
      } else {
        setMessage({ text: 'Ya existe un cliente con esta información', success: false });
      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      setMessage({ text: 'Error al enviar el formulario', success: false });
    }
  };

  const formatCuit = (input) => {
    const value = input.replace(/\D/g, '');

    const parts = [
      value.substr(0, 2),
      value.substr(2, 8),
      value.substr(10, 1),
    ];
    return parts.filter(Boolean).join('-');
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
              label="DNI"
              variant="outlined"
              type="number"
              InputProps={{
                inputMode: 'numeric',
                maxLength: 8,
              }}
              fullWidth
              //
              onChange={(event) => {
                const value = event.target.value.slice(0, 8);
                handleChange({
                  target: {
                    name: 'documento',
                    value,
                  },
                });
              }}
              //
              error={touched.documento && !!errors.documento}
              helperText={touched.documento && errors.documento}
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
              required={values.condicionIva === CondicionIva.ResponsableInscripto}
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
