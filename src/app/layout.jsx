'use client';
import './globals.css';
import React from 'react';
import { Roboto_Slab } from 'next/font/google';
import PropTypes from 'prop-types';
import { ReduxProvider } from './redux/provider';

const robotoSlab = Roboto_Slab({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

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
      <style jsx global>{`
        html {
          font-family: ${robotoSlab.style.fontFamily};
        }
      `}</style>
      <body className={robotoSlab.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
