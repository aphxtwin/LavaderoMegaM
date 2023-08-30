import 'server-only';
import React from 'react';
import { Card, CardContent } from '@mui/material';
import SearchElements from './searchElements';
import handleSearchClient from './actions';

function SearchClientBar() {
  return (
    <form action={handleSearchClient}>
      <Card elevation={3} sx={{ borderRadius: '25px', display: 'flex' }}>
        <CardContent>
          <SearchElements handleSearchClient={handleSearchClient} />
        </CardContent>
      </Card>
    </form>
  );
}

export default SearchClientBar;
