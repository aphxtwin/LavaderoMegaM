'use client';

import React from 'react';
import {
  List, ListItem, Box, Typography, ButtonBase,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import { setActiveStep } from '../../../../../redux/slices/stepperSlice';

function ClientListResults({ searchResults, toggleSelectClient }) {
  const dispatch = useDispatch();

  const handleClick = (clientId) => {
    toggleSelectClient(clientId);
    dispatch(setActiveStep(1));// Increment step by 1
  }
  return (
    <List>
      {searchResults.map((client) => (
        <ListItem
          key={client.clienteId}
          sx={{
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'text.primary',
            borderRadius: '8px',
            my: 1,
          }}
        >
          <ButtonBase
            fullWidth
            onClick={() => handleClick(client.clienteId)}
            sx={{
              borderRadius: '8px',
              width: '100%',
              justifyContent: 'flex-start',
              '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Render icon based on client type */}
              {client.tipoDeCliente === 'INDIVIDUO' ? <PersonIcon /> : <BusinessIcon />}
              <Box>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {client.nombreCompleto}
                </Typography>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1,
                }}
                >
                  {client.documento && (
                    <Typography variant="body2" component="span">
                      DNI:
                      {' '}
                      {client.documento}
                    </Typography>
                  )}
                  {client.documento && client.cuit && <Typography variant="caption">||</Typography>}
                  {client.cuit && (
                    <Typography variant="body2" component="span">
                      CUIT:
                      {' '}
                      {client.cuit}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </ButtonBase>
        </ListItem>
      ))}
    </List>
  );
}

export default ClientListResults;
