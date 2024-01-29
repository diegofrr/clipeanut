import type { Metadata } from 'next';

import '../styles/globals.css';
import Providers from './providers';

import { Plus_Jakarta_Sans } from 'next/font/google';
import { APP_VALUES } from '@/constants';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_VALUES.NAME
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="pt-br">
      <body className={`${plusJakartaSans.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
