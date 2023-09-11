'use client';

import React, { useState } from 'react';
import {
  Card, Box, CardContent, Typography, Paper, CardActionArea, ThemeProvider,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from 'react-redux';
import ClientDialog from '../../client/createClientForm/dialogCreateClient';
import theme from '../../loginForm/theme';
import { incrementStep } from '../../../../redux/slices/stepperSlice';

export default function NewClientCard() {
  const [showClient, setShowClient] = useState(false);
  const dispatch = useDispatch();
  const increment = () => dispatch(incrementStep());

  return (
    showClient
      ? (
        <ThemeProvider theme={theme}>
          <ClientDialog
            clientFormTextButton="Agregar Cliente y continuar ➕⏩"
            showClientForm={showClient}
            onSubmitSuccess={increment}
            toggleClientForm={() => setShowClient(!showClient)}
          />
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
                    Nuevo Cliente
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      )
  );
}
