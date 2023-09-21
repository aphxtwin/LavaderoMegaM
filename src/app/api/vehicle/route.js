import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

async function createVehicles(clienteId, vehicles) {
  const currentDate = new Date().toISOString();

  const vehiclePromises = vehicles.map(async (vehicleObj) => {
    const { action, vehicleDetails: vehicle } = vehicleObj;
    console.log(vehicleDetails)
    if (action === 'ADD') {
      return prisma.vehiculo.create({
        data: {
          tipoDeVehiculo: vehicle.tipoDeVehiculo,
          marca: vehicle.marca,
          modelo: vehicle.modelo,
          patente: vehicle.patente,
          observaciones: vehicle.observaciones || null,
          createdAt: currentDate,
          updatedAt: currentDate,
          clientes: {
            create: {
              cliente: {
                connect: {
                  clienteId: clienteId,
                },
              },
            },
          },
        },
      });
    }
  });

  return Promise.all(vehiclePromises); // Added to wait for all promises to resolve.
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
    const { clienteId, vehicles } = body;

    if (!clienteId || !vehicles || !Array.isArray(vehicles)) {
      return new NextResponse(JSON.stringify({ error: 'Debes ingresar un clienteId e informacion del vehiculo a agregar' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create vehicles
    const createdVehicles = await createVehicles(clienteId, vehicles);
    return new NextResponse(JSON.stringify({ success: true, createdVehicles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
