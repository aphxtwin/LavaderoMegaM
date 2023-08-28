'use server';

import 'server-only';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { prisma } from '@/lib/prisma';

const serverError = 'Hubo un problema con el servidor, chequea tu conexion a internet o contacta al proveedor.';

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
      return { error: 'No clients found.' };
    }
    return { clients };
  } catch (error) {
    if (error.name === 'PrismaClientKnownRequestError') {
      return { error: 'Database error.' };
    }
    return { error: serverError };
  }
}
