import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

async function handleVehicleScenario(clienteId, vehiculoId, action) {
  if (action === 'sharedVehicleScenario') {
    return prisma.clienteVehiculo.create({
      data: {
        clienteId,
        vehiculoId,
      },
    });
  }

  if (action === 'ownershipTransferScenario') {
    await prisma.clienteVehiculo.deleteMany({
      where: { vehiculoId },
    });

    return prisma.clienteVehiculo.create({
      data: {
        clienteId,
        vehiculoId,
      },
    });
  }

  throw new Error('Invalid action provided');
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
    const { clienteId, vehiculoId, action } = body;
    console.log(body);
    if (!clienteId || !vehiculoId || !action) {
      return new NextResponse(JSON.stringify({ error: 'Debes ingresar un clienteId, vehiculoId y una acción' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await handleVehicleScenario(clienteId, vehiculoId, action);
    return new NextResponse(JSON.stringify({ success: true, result }), {
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
