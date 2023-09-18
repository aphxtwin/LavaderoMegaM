'use server';

import 'server-only';
import prisma from '../../../../../../lib/prisma';

export default async function getVehiculosByClienteId(clienteId) {
  const clienteWithVehiculos = await prisma.cliente.findUnique({
    where: {
      clienteId,
    },
    select: {
      vehiculos: {
        select: {
          vehiculo: {
            select: {
              vehiculoId: true,
              tipoDeVehiculo: true,
              marca: true,
              modelo: true,
              patente: true,
              observaciones: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });

  // Extract vehiculos from the result
  const vehiculos = clienteWithVehiculos?.vehiculos.map((cv) => cv.vehiculo) || [];
  console.log(vehiculos);
  return vehiculos;
}
