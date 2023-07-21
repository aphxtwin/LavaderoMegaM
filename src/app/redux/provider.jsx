'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

// eslint-disable-next-line import/prefer-default-export
export function ReduxProvider({ children }) {
  return <Provider store={store}>{ children }</Provider>;
}
