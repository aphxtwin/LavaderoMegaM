import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/slices/authSlice';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Usuario requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .min(8, 'Contraseña incorrecta'),
});

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formStyle = {
    height: '75vh',
  };
  const paperStyle = {
    marginLeft: '7%',
    padding: '0 1.5rem 0 1.5rem',
  };
  const btnLogin = {
    padding: '0.3rem 3rem 0.3rem 3rem',
    backgroundColor: '#283D5B',
    '&:hover': {
      backgroundColor: '#384E6B',
    },
  };
  const inputFields = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#283D5B',
      },
      '&:hover fieldset': {
        borderColor: '#283D5B',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#283D5B',
      },
    },
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(logIn(data.user));
      } else {
        setErrors({ username: data, password: data });
        setLoading(false);
      }
    },
  });
  return (
    <Paper elevation={10} sx={paperStyle}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        sx={formStyle}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <Grid item>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                }}
              >
                <Image
                  src="./images/logo-dodle.svg"
                  width={200}
                  height={100}
                  alt="Logo"
                />
              </Typography>
              <Typography
                variant="subtitle1"
                mt={2}
                align="center"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                  color: '#082755',
                  fontWeight: 'semi-bold',
                }}
              >
                Ingrese sus datos para continuar
              </Typography>
            </Grid>
            <Grid item>
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
                required
                sx={inputFields}
              />
            </Grid>
            <Grid item>
              <TextField
                color="primary"
                id="outlined-password-input"
                label="Contraseña"
                name="password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
                required
                sx={inputFields}

              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                size="large"
                fullWidth
                sx={btnLogin}
                variant="contained"
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'ingresar'}
              </Button>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Paper>
  );
}

export default LoginForm;
