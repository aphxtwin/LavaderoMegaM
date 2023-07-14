import {  NextResponse } from 'next/server';
import {verifyAuth} from './lib/auth'

export default async function middleware(req) {

    const token = req.cookies.get('user-token')?.value;

    const verifiedToken = token && await verifyAuth(token).catch(err=>{
        console.log(err)
    })

    if(req.nextUrl.pathname.startsWith('/dashboard') && !verifiedToken){
        return NextResponse.redirect('http://localhost:3000/');
    }

    if(req.nextUrl.pathname === '/' && verifiedToken){
        return NextResponse.redirect('http://localhost:3000/dashboard');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*','/'],
};
