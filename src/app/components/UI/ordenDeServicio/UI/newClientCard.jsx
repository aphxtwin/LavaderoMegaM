'use client';

import React, { useState } from 'react';
import {
  Card, Box, CardContent, Typography, Paper, CardActionArea, ThemeProvider, Button
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClientForm from '../../client/createClientForm/clientForm';
import theme from '../../loginForm/theme';

export default function NewClientCard() {
  const [showClient, setShowclient] = useState(false);
  return (
    showClient
      ? <ThemeProvider theme={theme}>
          <Button sx={{color: 'white'}} onClick={()=> setShowclient(false)}>
            Cerrar
          </Button>
          <ClientForm />
        </ThemeProvider>
      : (
        <Paper elevation={10}>
          <Card variant="outlined" sx={{ padding: 2, maxWidth: '250px' }}>
            <CardActionArea onClick={() => setShowclient(true)}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '1px',
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 100 }} />
                  <Typography variant="h5" component="h2">
                    Añadir Nuevo Cliente
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      )
  );
}
