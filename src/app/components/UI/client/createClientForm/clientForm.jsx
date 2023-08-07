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
} from '@mui/material';


function ClientForm() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    idNumber: Yup.string().required('El documento es obligatorio').max(8, 'Máximo 8 caracteres'),
    address: Yup.string().required('El domicilio es obligatorio'),
    phoneNumber: Yup.string().required('El teléfono es obligatorio'),
    ivaCondition: Yup.string().required('La condición IVA es obligatoria'),
    email: Yup.string().email('Formato de correo inválido').required('El correo es obligatorio'),
  });

  const initialValues = {
    name: '',
    idNumber: '',
    address: '',
    phoneNumber: '',
    ivaCondition: 'Consumidor Final',
    email: '',
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
          name: formData.name,
          idNumber: formData.idNumber,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          ivaCondition: formData.ivaCondition,
          email: formData.email,
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
      validationSchema={validationSchema}>
      {({
        isSubmitting, handleChange, values, errors, touched,
      }) => (
        <Form>
          <Box>
            <Field
              as={TextField}
              name="name"
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Field
              as={TextField}
              name="idNumber"
              label="Documento"
              variant="outlined"
              type="number"
              inputProps={{ pattern: '[0-9]*' }}
              InputProps={{
                inputMode: 'numeric',
                maxLength: 8,
              }}
              fullWidth
              error={touched.idNumber && !!errors.idNumber}
              helperText={touched.idNumber && errors.idNumber}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Field
              as={TextField}
              name="address"
              label="Domicilio"
              variant="outlined"
              fullWidth
              error={touched.address && !!errors.address}
              helperText={touched.address && errors.address}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Field
              as={TextField}
              name="phoneNumber"
              label="Teléfono"
              variant="outlined"
              type="tel"
              inputProps={{ pattern: '[0-9]*' }}
              InputProps={{
                inputMode: 'numeric',
                maxLength: 10,
              }}
              fullWidth
              error={touched.phoneNumber && !!errors.phoneNumber}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="iva-condition">Condición IVA</InputLabel>
              <Select
                name="ivaCondition"
                label="Condición IVA"
                value={values.ivaCondition}
                onChange={handleChange}
                labelId="iva-condition"
              >
                <MenuItem value="Consumidor Final">Consumidor Final</MenuItem>
                <MenuItem value="Monotributista">Monotributista</MenuItem>
                <MenuItem value="Responsable inscripto">Responsable inscripto</MenuItem>
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
