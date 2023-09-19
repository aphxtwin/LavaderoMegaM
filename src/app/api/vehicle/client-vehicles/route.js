/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

const serverError = 'Error del servidor';

async function getVehiculosByCliente(clienteId) {
  try {
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
    return { success: true, vehiculos };
  } catch (error) {
    console.log(error)
    return { success: false, error: serverError };
  }
}

export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url);
    const clienteId = searchParams.get('clienteId');
    //Handle the case where clienteId is not provided
    if (!clienteId) {
      return new NextResponse(JSON.stringify({ error: 'Debes ingresar un clienteId.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await getVehiculosByCliente(Number(clienteId)); // Fetch vehicles by clienteId
    console.log(result)
    return new NextResponse(JSON.stringify(result), { // Respond with the result
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
    return new NextResponse(JSON.stringify({ error: e.message }), { // Handle errors
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
