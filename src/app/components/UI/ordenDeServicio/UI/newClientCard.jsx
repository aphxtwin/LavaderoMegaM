import React from 'react';
import { Card, Box, CardContent, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function NewClientCard() {
  return (
      <Card variant="outlined" sx={{padding:2, maxWidth:'400px'}}>
        <CardContent>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'2px'}}>
            <PersonAddIcon sx={{ fontSize: 100 }} />
            <Typography variant="h5" component="h2">
                Añadir Nuevo Cliente
            </Typography>
            </Box>
        </CardContent>
      </Card>
  );
}
