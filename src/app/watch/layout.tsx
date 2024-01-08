import type { Metadata } from 'next';

import { APP_VALUES } from '@/constants';

export const metadata: Metadata = {
  title: `${APP_VALUES.NAME} | ${APP_VALUES.PAGE_TITLES.WATCH}`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
