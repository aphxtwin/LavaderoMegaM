import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mega MultiServicios',
  description: '',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className} />
    </html>
  );
}
