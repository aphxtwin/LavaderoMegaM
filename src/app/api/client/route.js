import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

async function createCliente(data) {
  const prisma = new PrismaClient();
  const currentDate = new Date().toISOString();

  // const formattedVehicles = data.vehicleData.map((vehicle) => ({
  //   tipoVehiculo: vehicle.tipoDeVehiculo,
  //   marca: vehicle.marca,
  //   modelo: vehicle.modelo,
  //   patente: vehicle.patente,
  //   observaciones: vehicle.observaciones,
  //   createdAt: currentDate,
  //   updatedAt: currentDate,
  // }));

  const createdCliente = await prisma.cliente.create({
    data: {
      tipoDeCliente: data.clientData.tipoDeCliente,
      nombreCompleto: data.clientData.nombreCompleto,
      documento: parseInt(data.clientData.documento, 10),
      email: data.clientData.email,
      condicionIva: data.clientData.condicionIva,
      cuit: data.clientData.cuit,
      telefono: data.clientData.telefono,
      esCuentaCorriente: data.clientData.esCuentaCorriente,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  });

  // for (const vehicle of formattedVehicles) {
  //   await prisma.vehiculo.create({
  //     data: {
  //       ...vehicle,
  //       clienteId: createdCliente.clienteId,
  //     },
  //   });
  // }

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
    return new NextResponse(error.message, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
