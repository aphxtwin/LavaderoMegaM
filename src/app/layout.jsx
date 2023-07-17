import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import AuthContext from './components/layout/loginForm/authContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mega MultiServicios',
  description: '',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
