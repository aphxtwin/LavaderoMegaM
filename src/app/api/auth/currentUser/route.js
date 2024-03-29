import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

// eslint-disable-next-line import/prefer-default-export
export async function GET(req) {
  const token = req.cookies.get('user-token');
  if (!token) {
    return new NextResponse(JSON.stringify('No user logged in'), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = jwt.verify(token.value, secretKey);
  return new NextResponse(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
