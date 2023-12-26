'use client';

import NavBar from '@/components/Navbar';
import { NextUIProvider } from '@nextui-org/react';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        <NavBar />
        {children}
      </NextUIProvider>
    </>
  );
}
