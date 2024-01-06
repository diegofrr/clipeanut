import type { Metadata } from 'next';

import '../styles/globals.css';
import Providers from './providers';

import { Plus_Jakarta_Sans } from 'next/font/google';
import { APP_VALUES } from '@/constants';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${APP_VALUES.NAME} | ${APP_VALUES.PAGE_TITLES.HOME}`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="bg-black">
      <body className={`${plusJakartaSans.className} bg-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
