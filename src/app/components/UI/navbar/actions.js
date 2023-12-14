'use server';

import 'server-only';
import { cookies } from 'next/headers';

export default async function handleLogout() {
  try {
    cookies().delete('user-token');
  } catch (error) {
    return { error: 'Hubo un error al salir de la aplicacion...' };
  }
  return {};
}
