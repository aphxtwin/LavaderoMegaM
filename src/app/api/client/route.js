import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

async function createCliente(data) {
  const prisma = new PrismaClient();
  const currentDate = new Date().toISOString();

  const createdCliente = await prisma.cliente.create({
    data: {
      tipoDeCliente: data.clientData.tipoDeCliente,
      nombreCompleto: data.clientData.nombreCompleto,
      // if (documento)? it will be parsed as integer: If not => null.
      documento: data.clientData.documento ? parseInt(data.clientData.documento, 10) : null,
      email: data.clientData.email || null,
      condicionIva: data.clientData.condicionIva,
      cuit: data.clientData.cuit || null,
      telefono: data.clientData.telefono,
      esCuentaCorriente: data.clientData.esCuentaCorriente,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  });
  // Initialize an array to store all vehicle promises
  const vehiclePromises = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const vehicle of data.vehicleData) {
    const vehiclePromise = prisma.vehiculo.create({
      data: {
        tipoVehiculo: vehicle.tipoDeVehiculo,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        patente: vehicle.patente,
        observaciones: vehicle.observaciones || null,
        createdAt: currentDate,
        updatedAt: currentDate,
        // For this new car, I want to create a link to say it belongs to this customer.
        clientes: {
          create: {
            cliente: {
              connect: {
                clienteId: createdCliente.clienteId,
              },
            },
          },
        },
      },
    });
    vehiclePromises.push(vehiclePromise);
  }
  await Promise.all(vehiclePromises);
  return createdCliente;
}

// eslint-disable-next-line import/prefer-default-export
export async function POST(req) {
  if (req.method !== 'POST') {
    return new NextResponse('Unsupported method', {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const requestData = await req.json();
    const createdCliente = await createCliente(requestData);

    return new NextResponse(
      JSON.stringify(createdCliente),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
