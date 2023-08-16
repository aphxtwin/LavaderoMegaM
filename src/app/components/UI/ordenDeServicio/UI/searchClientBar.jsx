import React, { useState } from 'react';
import {
  InputAdornment, TextField, Select, MenuItem, IconButton, Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchClientBar() {
  const [searchType, setSearchType] = useState('DNI');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement the search logic here
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: '25px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <Select sx={{ backgroundColor: 'rgba(91, 91, 91, 0.1)' }} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <MenuItem value="DNI">DNI</MenuItem>
        <MenuItem value="CUIT">CUIT</MenuItem>
        <MenuItem value="Name">Nombre</MenuItem>
      </Select>
      <TextField
        variant="outlined"
        placeholder="Busca al cliente"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginLeft: '10px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" />
          ),
        }}
      />
    </Paper>
  );
}

export default SearchClientBar;
