import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

async function createVehicles(clienteId, vehicleDetails) {
  const currentDate = new Date().toISOString();
  return prisma.vehiculo.create({
    data: {
      tipoDeVehiculo: vehicleDetails.tipoDeVehiculo,
      marca: vehicleDetails.marca,
      modelo: vehicleDetails.modelo,
      patente: vehicleDetails.patente,
      observaciones: vehicleDetails.observaciones || null,
      createdAt: currentDate,
      updatedAt: currentDate,
      clientes: {
        create: {
          cliente: {
            connect: {
              clienteId,
            },
          },
        },
      },
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
    const body = await req.json();
    const { clienteId, vehicleDetails } = body;
    if (!clienteId || !vehicleDetails) {
      return new NextResponse(JSON.stringify({ error: 'Debes ingresar un clienteId e informacion del vehiculo a agregar' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create vehicles
    const createdVehicles = await createVehicles(clienteId, vehicleDetails);
    return new NextResponse(JSON.stringify({ success: true, createdVehicles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
