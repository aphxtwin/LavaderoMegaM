import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

async function createCliente(data) {
  const prisma = new PrismaClient();
  const currentDate = new Date().toISOString();

  return prisma.cliente.create({
    data: {
      tipoDeCliente: data.tipoDeCliente,
      nombreCompleto: data.nombreCompleto,
      documento: data.documento,
      email: data.email,
      condicionIva: data.condicionIva,
      cuit: data.cuit,
      telefono: data.telefono,
      esCuentaCorriente: data.esCuentaCorriente,
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
    const clienteData = await req.json();
    await createCliente(clienteData);
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
