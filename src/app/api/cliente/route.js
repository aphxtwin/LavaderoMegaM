import { prisma } from "src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method === 'POST') {
    
    try {
      const { name, id_number, email, phone, condIVA, domicilio } = await req.json();
      const cliente = await prisma.cliente.create({
        data: {
          rz: name,
          doc: id_number,
          dom: domicilio,
          tel_1: phone.toString(),
          correo: email,
          cond_iva: condIVA,
          usuario_id: 5,
          creado: new Date("2017-03-07T14:53:10.578Z"),
          modificado: new Date("2017-03-07 14:53:10.578Z")
        }
      });
 
    } catch (error) {
      return new NextResponse(JSON.stringify(error.message), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify("Solicitud POST exitosa"), {
      status: 200,
      headers: { "Content-Type": "application/json" }
      } 
    );
  }
  
  return new NextResponse(JSON.stringify("Método no permitido"), {
    status: 405,
    headers: { "Content-Type": "application/json" }
    } 
  );
};
    

   

