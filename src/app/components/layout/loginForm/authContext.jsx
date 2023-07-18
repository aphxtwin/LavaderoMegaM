'use client';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { context } from '../../../userContext';

export default function AuthContext({ children }) {
  const [userContext, setUserContext] = useState({});
  // FALTA OBTENER LOS DATOS DEL JWT Y PASARLOS A setUserContext POR SI RECARGA LA WEB
  const value = useMemo(() => ({ userContext, setUserContext }), [userContext, setUserContext]);

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};
