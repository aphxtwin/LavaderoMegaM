'use client';

import React, { useState } from 'react';
import {
  InputAdornment, TextField, Select, MenuItem, IconButton, Paper, List, Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import handleSearchClient from './actions';

function SearchClientBar() {
  const [searchType, setSearchType] = useState('DNI');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const data = await handleSearchClient({ searchType, searchQuery });
    setSearchResults(data.clients || []);
  };
  return (
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
          <IconButton action={handleSearch} >
            <SearchIcon />
          </IconButton>
          <Select sx={{ backgroundColor: 'rgba(91, 91, 91, 0.1)', marginLeft: '1%' }} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <MenuItem value="DNI">DNI</MenuItem>
            <MenuItem value="CUIT">CUIT</MenuItem>
            <MenuItem value="Name">Nombre</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            type="search"
            placeholder="Busca un cliente existente"
            value={searchQuery}
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginLeft: '2px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" />
              ),
            }}
          />
        </Box>
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
      </Box>

    </Paper>
  );
}

export default SearchClientBar;
