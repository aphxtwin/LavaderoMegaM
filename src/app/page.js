'use client'
import LoginForm from "./components/layout/loginForm/loginForm"
import { Grid } from "@mui/material"

export default function Home() {
  return (
    <Grid container justifyContent={'center'} sx={{height:'100vh'}} disableEqualOverflow spacing={3}>
      <LoginForm/>
    </Grid>
  )
}
