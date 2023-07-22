import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

// eslint-disable-next-line import/prefer-default-export
export async function GET(req) {
  // get the JWT token from the cookie
  const token = req.cookies.get('user-token').value;
  if (!token) {
    return new NextResponse(JSON.stringify('No user logged in'), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // decode the JWT token to get the user data
  const user = jwt.verify(token, secretKey);
  // return the user data
  return new NextResponse(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
