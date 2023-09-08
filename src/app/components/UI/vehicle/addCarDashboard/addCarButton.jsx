// AddButton.js
import React from 'react';
import { Button } from '@mui/material';

function AddButton({ title, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        background: '#2F3842',
        borderRadius: '3px',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
        padding: '10px 25px',
      }}
    >
      {title}
    </Button>
  );
}

export default AddButton;
