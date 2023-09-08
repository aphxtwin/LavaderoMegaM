/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved, import/extensions
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const serverError = 'Error del servidor';

async function searchVehicleByPatente(patente) {
  try {
    // Convert the given patente to uppercase for case-insensitive comparison
    const normalizedPatente = patente.toUpperCase();
    const vehicle = await prisma.vehiculo.findFirst({
      where: {
        patente: normalizedPatente,
      },
      include: {
        clientes: {
          select: {
            cliente: {
              select: {
                nombreCompleto: true, // Get the full name of the client
              },
            },
          },
        },
      },
    });

    if (vehicle) {
      const clientNames = vehicle.clientes.map((c) => c.cliente.nombreCompleto);
      return { exists: true, vehicle, owners: clientNames };
    }

    return { exists: false };
  } catch (error) {
    if (error instanceof PrismaClient.PrismaClientKnownRequestError) {
      return { error: 'Database error.' };
    }
    console.log(error);
    return { error: serverError };
  }
}

export async function POST(request) {
  try {
    const body = await request.json(); // Parse the request body
    const { patente } = body;

    // Handle the case where patente is not provided
    if (!patente) {
      return new NextResponse(JSON.stringify({ error: 'Debes ingresar una patente.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await searchVehicleByPatente(patente); // Check if the vehicle exists
    
    return new NextResponse(JSON.stringify(result), { // Respond with the result
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: e.message }), { // Handle errors
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
