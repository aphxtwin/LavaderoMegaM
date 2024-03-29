import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function AddButton({ title, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        background: '#000000',
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
AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default AddButton;
