'use client';

import React, { useState, useEffect } from 'react';
import {
  IconButton,
  CircularProgress,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
  Box,
  Container,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import PropTypes from 'prop-types';
import SkeletonSearch from './skeletonSearch';
import ClientListResults from './clientResultsList';
import theme from './theme';

export default function SearchElements({ handleSearchClient }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchType, setSearchType] = useState('Nombre');
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const { pending } = useFormStatus();

  const resetState = () => {
    setError(null);
    setSelectedClient(null);
    setSearchResults([]);
    setError(null);
  };

  useEffect(() => {
    resetState();
  }, [searchQuery]);

  const handleSearch = async () => {
    resetState();
    const data = await handleSearchClient({ searchType, searchQuery });
    if (data.error) {
      setError(data.error);
    } else {
      setSearchResults(data.clients || []);
    }
  };
  const toggleSelectClient = (clientId) => {
    if (selectedClient === clientId) {
      setSelectedClient(null); // Unselect the client if already selected
    } else {
      setSelectedClient(clientId); // Select the client if not already selected
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
          p: isMobile ? 1 : 2,
        }}
      >
        <Box>
          <Grid container alignItems="center">
            <Grid item>
              <Select
                sx={{ backgroundColor: 'rgba(91, 91, 91, 0.1)', fontSize: { xs: 10, sm: 12, md: 17 } }}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <MenuItem value="Nombre">Nombre</MenuItem>
                <MenuItem value="DNI">DNI</MenuItem>
                <MenuItem value="CUIT">CUIT</MenuItem>
              </Select>
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                type="search"
                placeholder="Busca un cliente existente"
                value={searchQuery}
                fullWidth
                disabled={pending}
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
            {error && <Grid item xs={12}><Box p={3} color="gray">{error}</Box></Grid>}
            {pending ? (
              <Grid item xs={12}>
                <Container sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}
                >
                  <SkeletonSearch />
                  <SkeletonSearch />
                  <SkeletonSearch />
                </Container>

              </Grid>
            ) : (
              searchResults.length > 0 && (
                <Grid item xs={12}>
                  <ClientListResults
                    searchResults={searchResults}
                    selectedClient={selectedClient}
                    toggleSelectClient={toggleSelectClient}
                  />
                </Grid>
              )
            )}

          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
SearchElements.propTypes = {
  handleSearchClient: PropTypes.func.isRequired,
};
