import { 
    Typography,
    Grid,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Paper } from '@mui/material';
  

function ServicesInProgressTable() {
  // You'll need to replace this with your actual data
  const rows = [
    { patente: 'ABC123', auto: 'Toyota', cliente: 'John Doe', entrada: '10:00 AM', estado: 'In Process' },
    // More rows here...
  ];
  return (
    <Paper sx={{marginTop:'2rem'}}>
      <Grid container spacing={3} >
        <Grid item xs={6}>
          <Typography variant={{ xs: 'h6', sm: 'h4', md: 'h3' }} >Actividad</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            Iniciados:
          </Typography>
          <Typography variant="body1">
            En Progreso:
          </Typography>
          <Typography variant="body1">
            Terminados: 
          </Typography>
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