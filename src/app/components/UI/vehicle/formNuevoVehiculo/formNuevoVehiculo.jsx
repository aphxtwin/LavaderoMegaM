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
import { TipoDeVehiculo, Marca } from '@prisma/client';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addVehicle } from '../../../../redux/slices/vehicleSlice';
import PatenteTextField from './patenteTextField';
import HandleVehicleAlreadyExists from './handleVehicleAlreadyExists/handleVehicleAlreadyExists';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [plateChecked, setPlateChecked] = useState(false);
  const [owners, setOwners] = useState('');
  const [existentVehicle, setExistentVehicle] = useState(null);

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
      const formData = { ...values };

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
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      setErrors({ submit: 'Hubo un problema al enviar el formulario.' });
    }
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
              errors={errors}
              onPlateExistenceChecked={handlePlateExistenceCheck}
            />
            <HandleVehicleAlreadyExists
              open={dialogOpen}
              owners={owners}
              vehicleDetails={existentVehicle}
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
                  errors={touched.marca && Boolean(errors.marca)}
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
              errors={touched.modelo && Boolean(errors.modelo)}
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
            <Button type="submit" variant="contained" disabled={!plateChecked} color="primary">
              Agregar vehículo
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
FormNuevoVehiculo.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
export default FormNuevoVehiculo;
