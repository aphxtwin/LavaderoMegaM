'use server';

import 'server-only';
// eslint-disable-next-line import/no-unresolved, import/extensions
import prisma from '@/lib/prisma';

const serverError = 'Error del servidor';

function getWhereClause(searchType, searchQuery) {
  switch (searchType) {
    case 'DNI':
      return { documento: parseInt(searchQuery, 10) };
    case 'CUIT':
      return { cuit: searchQuery };
    case 'Nombre':
      return {
        nombreCompleto: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      };
    default:
      return {};
  }
}

export default async function handleSearchClient({ searchType, searchQuery }) {
  try {
    const clients = await prisma.Cliente.findMany({
      where: getWhereClause(searchType, searchQuery),
      take: 5,
    });

    if (!clients || clients.length === 0) {
      return { error: 'No se encontraron resultados para tu busqueda' };
    }
    return { clients };
  } catch (error) {
    if (error.name === 'PrismaClientKnownRequestError') {
      return { error: 'Database error.' };
    }
    if (error.message && error.message.includes('Unable to fit integer value')) {
      return { error: 'El valor proporcionado es demasiado grande para ser procesado.' };
    }
    return { error: serverError };
  }
}
