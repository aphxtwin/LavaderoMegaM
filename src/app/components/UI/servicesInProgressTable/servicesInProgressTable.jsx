'use client';

import React from 'react';
import {
  Typography,
  Grid,
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
} from '@mui/material';
import theme from './theme';
import CarReadyCheckbox from './carReadyCheckbox/carReadyCheckbox';

function ServicesInProgressTable() {
  // dUMMY DATA
  const rows = [
    {
      patente: 'ABC123', auto: 'Toyota', cliente: 'John Doe', entrada: '10:00 AM', estado: 'Iniciado',
    },
    {
      patente: 'ABC1235', auto: 'Toyota', cliente: 'John Doe', entrada: '10:00 AM', estado: 'En Progreso',
    },
    {
      patente: 'ABC1255', auto: 'Toyota', cliente: 'John Doe', entrada: '10:00 AM', estado: 'Terminado',
    },
    // More rows here...
  ];
  const iniciados = 10;
  const enProgreso = 5;
  const terminados = 15;
  const statusColor = (state) => {
    switch (state) {
      case 'Iniciado':
        return { color: 'rgba(84, 81, 255, 1)' };
      case 'En Progreso':
        return { color: 'rgba(255, 107, 0, 1)' };
      case 'Terminado':
        return { color: 'rgba(32, 120, 36, 1)' };
      default:
        return {};
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ marginTop: '2rem' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '1rem' }}>
              <Typography variant="h1" sx={{ fontWeight: 'bold' }}>Actividad</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginLeft: '1rem' }}>
              <Grid container spacing={1}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>{iniciados}</Typography>
                  <Typography variant="body1">Iniciados</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>{enProgreso}</Typography>
                  <Typography variant="body1">En Progreso</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>{terminados}</Typography>
                  <Typography variant="body1">Terminados</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ borderTop: '4px solid rgba(183, 184, 192, 1)', borderBottom: '4px solid rgba(183, 184, 192, 1)' }}>
                  <TableRow>
                    <TableCell />
                    <TableCell>Patente</TableCell>
                    <TableCell>Auto</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Entrada</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.patente}>
                      <TableCell>
                        <CarReadyCheckbox
                          car={row.auto}
                          plate={row.patente}
                          client={row.cliente}
                        />
                      </TableCell>
                      <TableCell>{row.patente}</TableCell>
                      <TableCell>{row.auto}</TableCell>
                      <TableCell>{row.cliente}</TableCell>
                      <TableCell>{row.entrada}</TableCell>
                      <TableCell>
                        <Typography sx={statusColor(row.estado)}>
                          {row.estado}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>

  );
}
export default ServicesInProgressTable;
