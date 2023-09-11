/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Formik, Form,
} from 'formik';
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
  Grid,
  // Container,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { CondicionIva, TipoDeCliente } from '@prisma/client';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import validationSchema from './validationSchema';
import IndividualForm from './individuoFields';
import EmpresaForm from './companyFields';
import AddCarDashboard from '../../vehicle/addCarDashboard/addCarDashboard';
import ButtonAddCar from './buttonAddCar/buttonAddCar';
import { resetVehicles } from '../../../../redux/slices/vehicleSlice';

function ClientForm({ textButton = 'Agregar Nuevo Cliente', onSubmitSuccess = () => {} }) {
  const dispatch = useDispatch();
  const vehicleState = useSelector((state) => state.vehicle);
  const [message, setMessage] = useState({ text: '', success: true });
  const [showCarDashboard, setshowCarDashboard] = useState(false);

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
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setMessage({ text: 'El cliente se ha guardado exitosamente', success: true });
        dispatch(resetVehicles());
        resetForm();
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        const responseData = await response.json(); // Parse the error message from the response
        setMessage({ text: responseData.message || 'Error desconocido', success: false });
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
          <Box sx={{
            my: 2, justifyContent: 'center',
          }}
          >
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
                <MenuItem value={TipoDeCliente.INDIVIDUO}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    Individuo
                  </Box>
                </MenuItem>
                <MenuItem value={TipoDeCliente.EMPRESA}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon />
                    Empresa
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

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
            <Grid container>
              <Grid item xs={6}><ButtonAddCar onClick={toggleCarDashboard} /></Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  label="Abrir una Cuenta Corriente?"
                  control={(
                    <Switch
                      checked={values.esCuentaCorriente}
                      onChange={handleChange}
                      name="esCuentaCorriente"
                      color="primary"
                    />
                )}
                />
              </Grid>
            </Grid>

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
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : textButton }
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
ClientForm.propTypes = {
  textButton: PropTypes.string,
};
ClientForm.defaultProps = {
  textButton: 'Agregar Nuevo Cliente',
};
export default ClientForm;
