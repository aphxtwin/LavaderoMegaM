import React, { useState } from 'react';
import {
  Formik, Form,
} from 'formik';
import * as Yup from 'yup';
import {
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
import { CondicionIva, TipoDeCliente } from '@prisma/client';
import IndividualForm from './individuoFields';
import EmpresaForm from './companyFields';
import AddCarDashboard from '../../vehicle/addCarDashboard/addCarDashboard';
import ButtonAddCar from './buttonAddCar/buttonAddCar';
import { useSelector } from 'react-redux';

function ClientForm() {
  const vehicleState = useSelector(state => state.vehicle);
  const [message, setMessage] = useState({ text: '', success: true });
  const [showCarDashboard, setshowCarDashboard] = useState(false);
  const validationSchema = Yup.object().shape({
    nombreCompleto: Yup.string().required('El nombre es obligatorio'),
    documento: Yup.number()
      .nullable()
      .when('tipoDeCliente', (tipoDeCliente, field) => (
        tipoDeCliente[0] === TipoDeCliente.INDIVIDUO // Comparing the first element of the array
          ? field.required('El documento es obligatorio')
          : field)),
    email: Yup.string().email('Formato de correo inválido'),
    condicionIva: Yup.string().required('La condición IVA es obligatoria'),
    cuit: Yup.string()
      .test(
        'cuit-validation',
        'El CUIT es obligatorio',
        (value, { parent }) => {
          const { condicionIva, tipoDeCliente } = parent;
          return !(
            (condicionIva === CondicionIva.ResponsableInscripto
            || tipoDeCliente === TipoDeCliente.EMPRESA)
            && !value
          );
        },
      )
      .matches(/^[0-9]{2}-[0-9]{8}-[0-9]{1}$/, 'El CUIT debe tener 11 dígitos y el formato XX-XXXXXXXX-X'),
    telefono: Yup.string().required('El teléfono es obligatorio'),
    esCuentaCorriente: Yup.boolean(),
  });

  const initialValues = {
    nombreCompleto: '',
    tipoDeCliente: TipoDeCliente.INDIVIDUO,
    documento: null,
    email: '',
    condicionIva: CondicionIva.ConsumidorFinal,
    cuit: '',
    telefono: '',
    esCuentaCorriente: false,
  };
  const handleSubmit = async (values, { resetForm }) => {
    const formData = { ...values };
    formData.cuit = formData.cuit.replace(/\D/g, '-');
    try {
      const requestData = {
        clientData: {
          tipoDeCliente: formData.tipoDeCliente,
          nombreCompleto: formData.nombreCompleto,
          documento: formData.documento,
          email: formData.email,
          telefono: formData.telefono,
          cuit: formData.cuit,
          condicionIva: formData.condicionIva,
          esCuentaCorriente: formData.esCuentaCorriente,
        },
        vehicleData: vehicleState.vehicles,
      };
      const res = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        setMessage({ text: 'El cliente se ha guardado exitosamente', success: true });
        resetForm();
      } else {
        setMessage({ text: 'Ya existe un cliente con esta información', success: false });
      }
    } catch (error) {
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
  const toggleCarDashboard = () => {
    setshowCarDashboard(!showCarDashboard);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        isSubmitting, handleChange, values, errors, touched, setFieldValue,
      }) => (
        <Form>
          <Box sx={{ my: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="client-type">Tipo de Cliente</InputLabel>
              <Select
                name="tipoDeCliente"
                label="Tipo de Cliente"
                value={values.tipoDeCliente}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value === TipoDeCliente.EMPRESA) {
                    setFieldValue('documento', null);
                  }
                }}
                labelId="tipo-de-cliente"
              >
                <MenuItem value={TipoDeCliente.INDIVIDUO}>Individuo</MenuItem>
                <MenuItem value={TipoDeCliente.EMPRESA}>Empresa</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {values.tipoDeCliente === TipoDeCliente.INDIVIDUO ? (
            <IndividualForm
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              formatCuit={formatCuit}
            />
          ) : (
            <EmpresaForm
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              formatCuit={formatCuit}
            />
          )}
          <AddCarDashboard
            showCarDashboard={showCarDashboard}
            toggleCarDashboard={toggleCarDashboard}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ my: 2 }}>
              <ButtonAddCar onClick={toggleCarDashboard} />
            </Box>
            <Box sx={{ my: 2, marginLeft: '1rem' }}>
              <FormControlLabel
                label="¿Abrir una Cuenta Corriente?"
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
