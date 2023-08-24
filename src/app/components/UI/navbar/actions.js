'use server';

import { cookies } from 'next/headers';

export default async function handleLogout() {
  try {
    cookies().delete('user-token');
    return true;
  } catch (error) {
    return false;
  }
}
