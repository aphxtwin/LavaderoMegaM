'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  TextField,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/slices/authSlice';
import LoginFormLayout from './loginLayout';
import { authenticateUser } from './authApi';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Usuario requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .min(8, 'Contraseña incorrecta'),
});

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setIsSubmitting(true);
      setLoading(true);

      const response = await authenticateUser(values.username, values.password);

      if (response.success) {
        dispatch(logIn(response.user));
      } else {
        setErrors({ username: response.errors, password: response.errors });
        setLoading(false);
        setIsSubmitting(false);
      }
    },
  });
  return (
    <LoginFormLayout>
      <form onSubmit={formik.handleSubmit}>
        <Grid>
          <Grid item sx={{ marginBottom: '1rem' }}>
            <TextField
              color="primary"
              id="outlined-basic"
              label="Usuario"
              variant="outlined"
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
              error={
                formik.touched.username && Boolean(formik.errors.username)
              }
              helperText={formik.touched.username && formik.errors.username}
              fullWidth
              autoComplete="username"
              required
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item>
            <TextField
              color="primary"
              id="outlined-password-input"
              label="Contraseña"
              name="password"
              type="password"
              autoComplete="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
            formik.touched.password && Boolean(formik.errors.password)
          }
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              required
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item sx={{ marginTop: '1rem' }}>
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'ingresar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </LoginFormLayout>

  );
}

export default LoginForm;
