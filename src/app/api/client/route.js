import { prisma } from "src/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
  if (req.method === 'POST') {
    try {
      const { name, idNumber, address, phoneNumber, email, ivaCondition } = await req.json();
      const currentDate = new Date();

      await prisma.cliente.create({
        data: {
          rz: name,
          doc: idNumber.toString(),
          dom: address,
          tel_1: phoneNumber.toString(),
          correo: email,
          cond_iva: ivaCondition,
          usuario_id: 5, // Asignar el usuario_id obtenido de la API /currentUser
          creado: currentDate.toISOString(),
          modificado: currentDate.toISOString()
        }
      });

      return new NextResponse(JSON.stringify("Solicitud POST exitosa"), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      return new NextResponse(JSON.stringify(error.message), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  console.warn("Método no permitido:", req.method);
  return new NextResponse(JSON.stringify("Método no permitido"), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
};
