import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

async function createVehicle(data) {
  const prisma = new PrismaClient();
  const currentDate = new Date().toISOString();

  return prisma.vehiculo.create({
    data: {
      clienteId: 52,
      tipoDeCliente: data.tipoDeCliente,
      nombreCompleto: data.nombreCompleto,
      tipoVehiculo: data.tipoDeVehiculo, 
      marca: data.marca,          
      modelo: data.modelo,
      patente: data.patente,
      observaciones: data.observaciones,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  });
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
    const vehicleData = await req.json();
    await createVehicle(vehicleData);
    return new NextResponse('POST request successful', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
