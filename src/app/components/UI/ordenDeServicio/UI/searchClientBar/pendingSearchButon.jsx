'use client';

import React from 'react';
import {
  IconButton, CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function PendingSearchButon() {
  const { pending } = useFormStatus();
  return (
    <IconButton type="submit" disabled={pending}>
      {pending ? <CircularProgress size={30} sx={{ color: 'black' }} /> : <SearchIcon />}
    </IconButton>
  );
}
