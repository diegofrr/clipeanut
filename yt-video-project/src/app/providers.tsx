'use client';

import PipedInstanceProvider from '@/contexts/pipedInstance';
import { NextUIProvider } from '@nextui-org/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PipedInstanceProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </PipedInstanceProvider>
  );
}
