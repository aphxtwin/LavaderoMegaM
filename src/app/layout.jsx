import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';

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
  RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
