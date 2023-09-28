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
  Alert,
  CircularProgress,
} from '@mui/material';
import { TipoDeVehiculo, Marca } from '@prisma/client';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addVehicle } from '../../../../redux/slices/vehicleSlice';
import PatenteTextField from './patenteTextField';
import HandleVehicleAlreadyExists from './handleVehicleAlreadyExists/handleVehicleAlreadyExists';

function FormNuevoVehiculo({ onSuccess, submitDirectly = false, onCarCreated }) {
  const dispatch = useDispatch();
  const clienteId = useSelector((state) => state.client.clientId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [plateChecked, setPlateChecked] = useState(false);
  const [owners, setOwners] = useState('');
  const [existentVehicle, setExistentVehicle] = useState(null);
  const [responseMessage, setResponseMessage] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    tipoDeVehiculo: Yup.string().required('El tipo de vehículo es obligatorio'),
    patente: Yup.string()
      .matches(/^(?:[a-zA-Z]{3}\d{3}|\d{3}[a-zA-Z]{3}|[a-zA-Z]{2}\d{3}[a-zA-Z]{2})$/, 'Patente invalida :/')
      .required('La patente es requerida'),
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

  const handlePlateExistenceCheck = (exists, vehicle, owner) => {
    if (exists) {
      // Open the dialog; Set the existent vehicle; Recognize the owner(for the modal)
      setDialogOpen(true);
      setExistentVehicle(vehicle);
      setOwners(owner);
    } else {
      setPlateChecked(true);
    }
  };

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    try {
      const formData = { ...values, patente: values.patente.toUpperCase() };

      const vehicleDetails = {
        tipoDeVehiculo: formData.tipoDeVehiculo,
        patente: formData.patente,
        marca: formData.marca,
        modelo: formData.modelo,
        observaciones: formData.observaciones,
      };

      const payload = {
        details: { vehicleDetails },
        type: 'ADD',
      };

      dispatch(addVehicle(payload));
      if (submitDirectly === true) {
        // submitDirectly means that it's not necesary dispatch the vehicle, just
        // make the api call to create the new vehicle or whatever thing that the type of action
        // says. p.s submitDirectly => is a boolean, which the default value is false.

        setLoading(true);
        try {
          const res = await fetch('/api/vehicle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clienteId, vehicleDetails }),
          });
          if (!res.ok) {
            setResponseMessage({ type: 'error', message: `Error: ${res.status} - El vehiculo no se pudo crear` });
            throw Error(`HTTP error! Status: ${res.status}`);
          }
          if (res.ok) {
            // if response is ok, call onCarCreated to re-fetch the data && set a feedback message
            setResponseMessage({ type: 'success', message: 'El vehiculo se creo con exito! 😊' });
            if (onCarCreated) onCarCreated();
          }
        } catch (err) {
          setResponseMessage({ type: 'error', message: 'El vehiculo no pudo ser creado. Intenta mas tarde' });
        }
      }
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      setErrors({ submit: 'Hubo un problema al enviar el formulario.' });
    }
    setLoading(false);
    return {};
  };
  const marcas = Object.values(Marca);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange, values, errors, touched, handleBlur,
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
              validationSchema={validationSchema}
              error={errors}
              onPlateExistenceChecked={handlePlateExistenceCheck}
            />
            <HandleVehicleAlreadyExists
              open={dialogOpen}
              owners={owners}
              vehicleDetails={existentVehicle}
              clienteId={clienteId}
              submitDirectly={submitDirectly}
              onClose={() => setDialogOpen(false)}
            />
            <FormControl fullWidth required variant="outlined">
              <InputLabel htmlFor="vehicle-type">Tipo de Vehículo</InputLabel>
              <Select
                name="tipoDeVehiculo"
                label="Tipo de Vehículo"
                value={values.tipoDeVehiculo}
                onChange={handleChange}
                labelId="vehicle-type"
              >
                {Object.values(TipoDeVehiculo).map((type) => (
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
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  error={touched.marca && Boolean(errors.marca)}
                  label="Marca"
                  required
                  variant="outlined"
                />
              )}
            />

            <TextField
              name="modelo"
              label="Modelo"
              value={values.modelo}
              required
              onChange={handleChange}
              error={touched.modelo && errors.modelo}
            />
            <TextField
              name="observaciones"
              label="Observaciones"
              value={values.observaciones}
              onChange={handleChange}
            />
          </Box>
          {responseMessage.message && (
          <Alert severity={responseMessage.type === 'error' ? 'error' : 'success'}>
            {responseMessage.message}
          </Alert>
          )}
          <Box sx={{ my: 2 }} textAlign="center">
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" disabled={!plateChecked || loading} color="primary">
                Agregar vehículo
              </Button>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
}
FormNuevoVehiculo.propTypes = {
  onSuccess: PropTypes.func,
  submitDirectly: PropTypes.bool,
  onCarCreated: PropTypes.func,
};
FormNuevoVehiculo.defaultProps = {
  submitDirectly: false,
  onSuccess: () => {},
  onCarCreated: () => {},
};
export default FormNuevoVehiculo;
