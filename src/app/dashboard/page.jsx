'use client';

import React from 'react';
import { context } from '../userContext';

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <context.Consumer>
        {({ userContext }) => (
          <div>
            usuario -
            {' '}
            {userContext.name}
          </div>
        )}
      </context.Consumer>
    </div>
  );
}
