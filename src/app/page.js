"use client";
import React, { useState } from "react";
import Dashboard from "./components";
import LoginForm from "./components/layout/loginForm/loginForm";
import { Grid } from "@mui/material";
import Router from "next/router";
export default function Home() {
  const [user, setUser] = useState(null);
  // verificar jwt y la sesion
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems={"center"}
      sx={{ height: "100vh" }}
      disableequaloverflow={"true"}
      spacing={3}
    >
      {user ? <LoginForm setUser={setUser} /> : <Dashboard />}
    </Grid>
  );
}
