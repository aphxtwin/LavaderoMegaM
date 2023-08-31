import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function StepContainer({ children }) {
  return (
    <Box sx={{ height: '100vh', backgroundColor: '#f8fafc' }}>
      {children}
    </Box>
  );
}
StepContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
