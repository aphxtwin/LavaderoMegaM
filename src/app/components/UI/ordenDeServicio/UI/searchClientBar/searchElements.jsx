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
  Grid,
  Box,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import theme from './theme';

export default function SearchElements({ handleSearchClient }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
      <Paper
        elevation={2}
        sx={{
          borderRadius: '25px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '600px',
          m: 'auto',
          p: isMobile? 1 : 2,
        }}
      >
        <Box>
          <Grid container alignItems="center">
            <Grid item>
              <Select
                sx={{ backgroundColor: 'rgba(91, 91, 91, 0.1)', fontSize:{xs:10, sm:12, md:17} }}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <MenuItem value="DNI">DNI</MenuItem>
                <MenuItem value="CUIT">CUIT</MenuItem>
                <MenuItem value="Nombre">Nombre</MenuItem>
              </Select>
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                type="search"
                placeholder="Busca un cliente existente"
                value={searchQuery}
                fullWidth
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton aria-label="Search client" type="submit" onClick={handleSearch} disabled={pending}>
                        {pending ? <CircularProgress size={30} sx={{ color: 'black' }} /> : <SearchIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {error && <Grid item xs={12}><Box color="gray">{error}</Box></Grid>}
            {searchResults.length > 0 && (
            <Grid item xs={12}>
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
            </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
