import 'server-only';
import React from 'react';
import SearchElements from './searchElements';
import handleSearchClient from './actions';

function SearchClientBar() {
  return (
    <form action={handleSearchClient} sx={{ display: 'flex', justifyContent: 'center' }}>
      <SearchElements handleSearchClient={handleSearchClient} />
    </form>
  );
}

export default SearchClientBar;
