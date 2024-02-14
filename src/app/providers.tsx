'use client';

import { useRouter } from 'next/navigation';

import PipedInstanceProvider from '@/contexts/pipedInstance';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <PipedInstanceProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <NextUIProvider navigate={router.push}>
          <Toaster />
          {children}
        </NextUIProvider>
      </NextThemesProvider>
    </PipedInstanceProvider>
  );
}
