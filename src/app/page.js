'use client'
import LoginForm from "./components/layout/loginForm/loginForm"
import { Grid } from "@mui/material"

export default function Home() {
  return (
    <Grid container justifyContent={'center'}>
      <LoginForm/>
    </Grid>
  )
}
