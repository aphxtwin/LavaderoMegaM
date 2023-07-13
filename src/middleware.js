
import { NextResponse } from 'next/server';
import {verifyAuth} from './lib/auth'


export async function middleware(req) {

    const token = req.cookies.get('user-token');


    const verifiedToken = token && await verifyAuth(token).catch(err=>{
        console.log(err)
    })


    if(req.nextUrl.pathname.startsWith('') && !verifiedToken){
        return
    }

    if(!verifiedToken){
        return NextResponse.redirect(new URL('/'), req.url)
    }

    if(req.url.includes('/') && verifiedToken){
        return NextResponse.redirect(new URL('/dashboard'))
    }
}

export const config = {
    matcher: ['/dashboard', '/'],
};
