'use client';

import React, { useState, useEffect } from 'react';
import {
  IconButton,
  CircularProgress,
  Select,
  MenuItem,
  List,
  TextField, 
  InputAdornment, 
  Box, 
  ThemeProvider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import theme from './theme';

export default function SearchElements({ handleSearchClient }) {
  const [searchType, setSearchType] = useState('DNI');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const { pending } = useFormStatus();

  const resetState = () => {
    setSearchResults([]);
    setError(null);
  };

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
      <Box sx={{ display: 'flex', flexDirection: 'column', pl: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow:1 }}>
          <IconButton type="submit" onClick={handleSearch} disabled={pending}>
            {pending ? <CircularProgress size={30} sx={{ color: 'black' }} /> : <SearchIcon />}
          </IconButton>
          <Select
            sx={{ backgroundColor: 'rgba(91, 91, 91, 0.1)' }}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
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
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </Box>
        {error && <Box mt={3} color="gray">{error}</Box>}
        {searchResults.length > 0 && (
        <Box mt={3}>
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
        )}
      </Box>
    </ThemeProvider>
  );
}
