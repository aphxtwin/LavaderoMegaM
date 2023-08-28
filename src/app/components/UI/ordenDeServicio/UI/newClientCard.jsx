import React from 'react';
import {
  Card, Box, CardContent, Typography, Paper,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function NewClientCard() {
  return (
    <Paper elevation={10}>
      <Card variant="outlined" sx={{ padding: 2, maxWidth: '250px' }}>
        <CardContent>
          <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1px',
          }}
          >
            <PersonAddIcon sx={{ fontSize: 100 }} />
            <Typography variant="h5" component="h2">
              Añadir Nuevo Cliente
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Paper>

  );
}
