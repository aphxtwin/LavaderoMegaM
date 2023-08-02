/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/extensions, import/no-unresolved
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line no-extend-native, func-names
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const secretKey = process.env.JWT_SECRET_KEY;

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const genericError = 'Invalid username or password.';
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return new NextResponse(JSON.stringify(genericError), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      // user exists and password is correct
      const { hash, ...userWithoutHash } = user;
      const token = jwt.sign(userWithoutHash, secretKey, { expiresIn: '10h' });
      return new NextResponse(
        JSON.stringify({ user: userWithoutHash, token }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `user-token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`,
          },
        },
      );
    }
    return new NextResponse(JSON.stringify(genericError), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error.message), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
