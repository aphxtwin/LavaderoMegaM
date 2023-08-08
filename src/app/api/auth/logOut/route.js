import { NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function POST() {
  return new NextResponse(JSON.stringify('Logged out succesfully'), {
    status: 200,
    headers: {
      'Set-Cookie': 'user-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax; Secure',
    },
  });
}
