'use server';

import 'server-only';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line no-extend-native, func-names
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const secretKey = process.env.JWT_SECRET_KEY;

export default async function handleLogIn({ values }) {
  const genericError = 'Usuario y/o Contraseña invalido/s.';
  const serverError = 'Hubo un problema con el servidor, chequea tu conexion a internet o contacta al proveedor.';

  if (!secretKey) {
    return { error: serverError };
  }

  try {
    const { username, password } = values;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return { error: genericError };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { error: genericError };
    }

    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign(userWithoutHash, secretKey, { expiresIn: '10d' });

    cookies().set({
      name: 'user-token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: true,
      maxAge: 10 * 24 * 60 * 60,
    });

    return { user: userWithoutHash, token };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return { error: 'Token generation error.' };
    } if (error.message && error.message.includes('bcrypt')) {
      return { error: 'Password encryption error.' };
    } if (error.name === 'PrismaClientKnownRequestError') {
      return { error: 'Database error.' };
    }
    return { error: serverError };
  }
}
