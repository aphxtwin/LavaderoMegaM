'use client';

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  TextField,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logIn } from '../../../redux/slices/authSlice';

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
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setIsSubmitting(true);
      setLoading(true);
      const trimmedUsername = values.username.trim();
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(logIn(data.user));
      } else {
        setErrors({ username: data, password: data });
        setLoading(false);
        setIsSubmitting(false);
      }
    },
  });
  return (
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
  );
}

export default LoginForm;
