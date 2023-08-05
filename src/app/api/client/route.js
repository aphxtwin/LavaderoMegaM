import { prisma } from 'src/lib/prisma';
import { NextResponse } from 'next/server';

// Separate logic into smaller functions for clarity.
async function createCliente(data) {
  const currentDate = new Date().toISOString();

  return prisma.cliente.create({
    data: {
      rz: data.name,
      doc: data.idNumber.toString(),
      dom: data.address,
      tel_1: data.phoneNumber.toString(),
      correo: data.email,
      cond_iva: data.ivaCondition,
      usuario_id: 5, // TODO: Fetch this from the /currentUser API
      creado: currentDate,
      modificado: currentDate,
    },
  });
}

export async function POST(req) {
  if (req.method !== 'POST') {
    console.warn('Unsupported method:', req.method);
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
    console.error('Error processing the request:', error);
    return new NextResponse(error.message, {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
