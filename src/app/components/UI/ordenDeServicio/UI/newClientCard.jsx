'use client';

import React, {useState} from 'react';
import {
  Card, Box, CardContent, Typography, Paper, CardActionArea, ThemeProvider, Button, Slide
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClientDialog from '../../client/createClientForm/dialogCreateClient';
import theme from '../../loginForm/theme';

export default function NewClientCard() {
  const [showClient, setShowClient] = useState(false);

  return (
    showClient
      ? (
        <ThemeProvider theme={theme}>
          <ClientDialog showClientForm={showClient} toggleClientForm={() => setShowClient(!showClient)} />
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
