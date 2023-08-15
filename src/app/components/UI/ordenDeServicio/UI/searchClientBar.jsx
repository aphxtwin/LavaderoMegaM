'use client';
import React, { useState } from 'react';
import {
  Box, InputAdornment, TextField, Select, MenuItem, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchClientBar() {
  const [searchType, setSearchType] = useState('DNI');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement the search logic here
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <MenuItem value="DNI">DNI</MenuItem>
        <MenuItem value="CUIT">CUIT</MenuItem>
        <MenuItem value="Name">Nombre</MenuItem>
      </Select>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchClientBar;
