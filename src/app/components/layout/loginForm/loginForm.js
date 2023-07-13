import React, { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Usuario requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .min(8, 'Contraseña incorrecta'),
});


function LoginForm({setUser}) {
  const [loading, setLoading] = useState(false);

  const formStyle = {
    height:'75vh',
  }
  const paperStyle={
    marginLeft:'7%',
    padding:'0 1.5rem 0 1.5rem'
  }
  const btnLogin = {
    padding: "0.3rem 3rem 0.3rem 3rem",
    backgroundColor: "#27272a",
    "&:hover": {
      backgroundColor: "#09090b",
    },
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: values.username, password: values.password }),
      });
      const data = await res.json();
      setLoading(false)

      if (res.ok) {
        setUser(data.user);
      } else {
        if (data === "Usuario no encontrado") {
          setErrors({ username: data });
        } else if (data === "Contraseña incorrecta") {
          setErrors({ password: data });
        }
      }
    }
  });
  
  return (
    <Paper elevation={10} sx={paperStyle}>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"stretch"}
        sx={formStyle}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Grid item>
              <Typography
                variant="h4"
                align="center"
                sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" } }}
              >
                <img src="./images/logo-dodle.svg" height={'100px'}></img>
              </Typography>
              <Typography
                variant="subtitle1"
                mt={2}
                align="center"
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" } }}
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
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                fullWidth
                required
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
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
                required
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
                {loading ? <CircularProgress size={24}/> : "ingresar"}
              </Button>
            </Grid>
          </Box>
        </form>
      </Grid>
    </Paper>
  );
}

export default LoginForm;
