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
} from '@mui/material';

function ServicesInProgressTable() {
  // dUMMY DATA
  const rows = [
    {
      patente: 'ABC123', auto: 'Toyota', cliente: 'John Doe', entrada: '10:00 AM', estado: 'In Process',
    },
    {
      patente: 'ABC123', auto: 'Toyota', cliente: 'John Doe', entrada: '10:00 AM', estado: 'In Process',
    }
    // More rows here...
  ];
  const iniciados = 10;
  const enProgreso = 5;
  const terminados = 15;
  return (
    <Paper sx={{ marginTop: '2rem' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box sx={{padding:'1rem'}}>
              <Typography  variant={{ xs: 'h6', sm: 'h1' }} sx={{ fontWeight: 'bold' }}>Actividad</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4}>
              <Typography variant={{ xs: 'h5', sm: 'h4', md: 'h1' }} sx={{ fontWeight: 'bold' }}>{iniciados}</Typography>
              <Typography variant="body1">Iniciados</Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography variant={{ xs: 'h5', sm: 'h4' }} sx={{ fontWeight: 'bold' }}>{enProgreso}</Typography>
              <Typography variant="body1">En Progreso</Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography variant={{ xs: 'h5', sm: 'h4' }} sx={{ fontWeight: 'bold' }}>{terminados}</Typography>
              <Typography variant="body1">Terminados</Typography>
            </Grid>
        </Grid>
      </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
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
                    <TableCell>{row.patente}</TableCell>
                    <TableCell>{row.auto}</TableCell>
                    <TableCell>{row.cliente}</TableCell>
                    <TableCell>{row.entrada}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>

  );
}

export default ServicesInProgressTable;
