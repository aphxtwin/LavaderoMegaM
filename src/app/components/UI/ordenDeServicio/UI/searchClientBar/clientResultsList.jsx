import React from 'react';
import { List, ListItem, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ClientListResults({ searchResults, selectedClient, toggleSelectClient }) {
  return (
    <List>
      {searchResults.map((client) => (
        <ListItem
          key={client.clienteId}
          onClick={() => toggleSelectClient(client.clienteId)}
          sx={{
            backgroundColor: selectedClient === client.clienteId ? '#2F3842' : 'transparent',
            py: selectedClient === client.clienteId ? 1.5 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: selectedClient === client.clienteId ? 'white' : 'text.primary',
            borderRadius: '8px',
            my: 1,
          }}
        >
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {client.nombreCompleto}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              {client.documento && (
                <Typography variant="body2" component="span">
                  DNI: {client.documento}
                </Typography>
              )}
              {client.documento && client.cuit && <Typography variant="caption">||</Typography>}
              {client.cuit && (
                <Typography variant="body2" component="span">
                  CUIT: {client.cuit}
                </Typography>
              )}
            </Box>
          </Box>
          {selectedClient === client.clienteId && (
            <CheckCircleIcon />
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default ClientListResults;

