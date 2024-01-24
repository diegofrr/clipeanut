'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Icons from '@/icons';

import Search from './components/Search';

import type { UserTheme } from './types';

import { useTheme } from 'next-themes';
import { hasTopbar, hasSearchInput } from './utils';
import { AppBanner, AppLogo } from '../../../public/assets';
import { Button } from '@nextui-org/react';

export default function Topbar() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  const [isClient, setIsClient] = useState(false);
  const [userTheme, setUserTheme] = useState<UserTheme>({ name: '', icon: <></> });

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    setUserTheme({
      name: resolvedTheme === 'light' ? 'claro' : 'escuro',
      icon: resolvedTheme === 'light' ? <Icons.Sun /> : <Icons.Moon />
    });
  }, [resolvedTheme]);

  function handleToggleTheme() {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }

  return hasTopbar(pathname) ? (
    <header className="fixed top-0 left-0 px-6 lg:px-12 right-0 max-h-16 h-16 z-max bg-background">
      <div className="w-full h-full gap-6 flex flex-row justify-between items-center">
        <Link href="/">
          <AppLogo className="inline sm:hidden fill-app_orange-600" />
          <AppBanner className="hidden sm:inline fill-app_orange-600" />
        </Link>

        {hasSearchInput(pathname) && <Search />}

        {isClient ? (
          <Button radius="full" onClick={handleToggleTheme} startContent={userTheme.icon} isIconOnly variant="light" />
        ) : (
          <></>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
}
