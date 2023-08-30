'use client';

import React from 'react';
import {
  Card, Box, CardContent, Typography, Paper, CardActionArea, ThemeProvider, Button,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClientForm from '../../client/createClientForm/clientForm';
import theme from '../../loginForm/theme';

export default function NewClientCard({ showClient, setShowClient }) {
  
  return (
    showClient
      ? (
        <ThemeProvider theme={theme}>
          <Button sx={{ color: 'white' }} onClick={() => setShowClient(!showClient)}>
            Cerrar
          </Button>
          <ClientForm />
        </ThemeProvider>

      )
      : (
        <Paper elevation={10}>
          <Card variant="outlined" sx={{ padding: 2, maxWidth: '250px' }}>
            <CardActionArea onClick={() => setShowClient(true)}>
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
