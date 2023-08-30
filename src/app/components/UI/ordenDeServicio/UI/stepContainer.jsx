import React from 'react';
import {  Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function StepContainer({ children }) {
  return (
    <Box sx={{ backgroundColor: 'white', borderTop: '2px solid #DDDDDD' }}>
      {children}
    </Box>
  );
}
StepContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
