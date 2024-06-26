import type { Metadata } from 'next';

import Script from 'next/script';
import { APP_VALUES } from '@/constants';

export const metadata: Metadata = {
  title: APP_VALUES.NAME
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="scripts/hls.min.js" />
      <Script src="scripts/dash.all.min.js" />
      {children}
    </>
  );
}
