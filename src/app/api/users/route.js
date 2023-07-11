import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function GET(request) {}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(request, response) {
  try {
    const { username, password } = await request.json();
    // const { username, password } = JSON.parse(request.body);

    const user = await prisma.usuario.findFirst({
      where: {
        nombre: username,
      },
    });

    // bcrypt.hash(password, 10).then((hash) => {
    //   console.log(hash);
    // });
    if (!user) {
      return new NextResponse(JSON.stringify("Usuario no encontrado"), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let isValidPassword = await bcrypt.compare(password, user.hash);

    if (isValidPassword) {
      //usuario existe y contraseña es correcta
      return new NextResponse(JSON.stringify(user), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse(JSON.stringify("Contraseña incorrecta"), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error.message), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
