"use client";
import React, { useState, useEffect } from "react";

import LoginForm from "./components/layout/loginForm/loginForm";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  // verificar jwt y la sesion -  crear el context provideer
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);
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
      <LoginForm setUser={setUser} />
    </Grid>
  );
}
