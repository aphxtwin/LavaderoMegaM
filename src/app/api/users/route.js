import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


BigInt.prototype.toJSON = function () {
  return this.toString();
};
const secretKey = process.env.SECRET_KEY

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.usuario.findFirst({
      where: {
        nombre: username,
      },
    });
    if (!user) {
      return new NextResponse(JSON.stringify("Usuario no encontrado"), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.hash);

    if (isValidPassword) {
      //usuario existe y contraseña es correcta
      const {hash, ...userWithoutHash} = user
      const token = jwt.sign(userWithoutHash, secretKey ,{expiresIn:'5d'})
      return new NextResponse(JSON.stringify({user:userWithoutHash, token:token}), {
        status: 200,
        headers: { "Content-Type": "application/json" }, 
      });
      
    } else {
      return new NextResponse(JSON.stringify("Contraseña incorrecta"), {
        status: 400,
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
