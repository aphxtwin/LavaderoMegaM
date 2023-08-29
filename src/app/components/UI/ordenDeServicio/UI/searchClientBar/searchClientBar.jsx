'use client';

import React, { useState } from 'react';
import {
  InputAdornment, TextField, Select, MenuItem, Paper, List, Box,
} from '@mui/material';

import handleSearchClient from './actions';
import PendingSearchButon from './pendingSearchButon';

function SearchClientBar() {
  const [searchType, setSearchType] = useState('DNI');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const handleSearch = async () => {
    setError(null);
    const data = await handleSearchClient({ searchType, searchQuery });
    if (data.error) {
      setError(data.error);
    } else {
      setSearchResults(data.clients || [data]);
    }
    setSearchResults(data.clients || []);
  };
  return (
    <form action={handleSearch}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: '25px',
          padding: '5.5px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <PendingSearchButon />
            <Select sx={{ backgroundColor: 'rgba(91, 91, 91, 0.1)', marginLeft: '0.5%' }} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
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
              sx={{ marginLeft: '1px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" />
                ),
              }}
            />
          </Box>
          {
            error && <Box sx={{display:'flex',alignItems:'center'}}color="gray">{error}</Box>
          }
          {
            searchResults.length > 0
            && (
            <Box sx={{ display: 'flex', flexDirection: 'row', paddding: '2px' }}>
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
  );
}

export default SearchClientBar;
