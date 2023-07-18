'use client';

import React from 'react';

const context = React.createContext({
  userContext: {},
  setUserContext: () => {},
});

// eslint-disable-next-line import/prefer-default-export
export { context };
