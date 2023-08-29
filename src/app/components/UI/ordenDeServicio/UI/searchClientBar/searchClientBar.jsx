'use client';

import React, { useState, useEffect } from 'react';
import {
  InputAdornment, TextField, Select, MenuItem, Paper, List, Box, ThemeProvider,
} from '@mui/material';
import theme from './theme';
import handleSearchClient from './actions';
import PendingSearchButon from './pendingSearchButon';

function SearchClientBar() {
  const [searchType, setSearchType] = useState('DNI');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const resetState = () => {
    setSearchResults([]);
    setError(null);
  };

  // Watch for the searchQuery to change, then reset states
  useEffect(() => {
    resetState();
  }, [searchQuery]);
  const handleSearch = async () => {
    setError(null);
    const data = await handleSearchClient({ searchType, searchQuery });
    if (data.error) {
      setError(data.error);
    } else {
      setSearchResults(data.clients || []);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <form action={handleSearch}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: '25px',
            p: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', pl: 1 }}>
              <PendingSearchButon />
              <Select sx={{ backgroundColor: 'rgba(91, 91, 91, 0.1)' }} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <MenuItem value="DNI">DNI</MenuItem>
                <MenuItem value="CUIT">CUIT</MenuItem>
                <MenuItem value="Nombre">Nombre</MenuItem>
              </Select>
              <TextField
                variant="outlined"
                type="search"
                placeholder="Busca un cliente existente"
                value={searchQuery}
                fullWidth
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ pr: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" />
                  ),
                }}
              />
            </Box>
            {
              error && <Box y={3} color="gray">{error}</Box>
            }
            {
              searchResults.length > 0
              && (
              <Box p={3} sx={{ display: 'flex', flexDirection: 'row' }}>
                <List>
                  {searchResults.map((client) => (
                    <Box key={client.clienteId}>
                      {client.nombreCompleto}
                      {' '}
                      /
                      {' '}
                      {client.documento}
                      {' '}
                      /
                      {' '}
                      {client.cuit}
                    </Box>
                  ))}
                </List>
              </Box>
              )
            }

          </Box>

        </Paper>
      </form>
    </ThemeProvider>
  );
}

export default SearchClientBar;
