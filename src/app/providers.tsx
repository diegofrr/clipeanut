'use client';

import PipedInstanceProvider from '@/contexts/pipedInstance';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PipedInstanceProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <NextUIProvider>{children}</NextUIProvider>
      </NextThemesProvider>
    </PipedInstanceProvider>
  );
}
