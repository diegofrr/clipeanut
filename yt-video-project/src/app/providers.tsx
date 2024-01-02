'use client';

import PipedProvider from '@/contexts/pipedInstance';
import { NextUIProvider } from '@nextui-org/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PipedProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </PipedProvider>
    </>
  );
}
