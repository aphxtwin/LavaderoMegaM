'use client'
import LoginForm from "./components/layout/loginForm/loginForm"
import { Grid } from "@mui/material"

export default function Home() {
  return (
    <Grid container justifyContent='center' direction='column' alignItems={'center'} sx={{height:'100vh'}} disableequaloverflow={'true'} spacing={3}>
      <LoginForm/>
    </Grid>
  )
}
