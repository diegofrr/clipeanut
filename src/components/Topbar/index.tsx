'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Icons from '@/icons';
import Search from './components/Search';

import type { UserTheme } from './types';
import { AppBanner, AppLogo } from '../../../public/assets';
import { hasTopbar, hasSearchInput } from './utils';
import { Button } from '@nextui-org/react';

import { useTheme } from 'next-themes';

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

  const handleToggleTheme = () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light');

  return hasTopbar(pathname) ? (
    <header className="fixed top-0 left-0 px-6 lg:px-12 right-0 max-h-16 h-16 z-max bg-background">
      <div className="w-full h-full gap-2 sm:gap-6 flex flex-row justify-between items-center">
        <Link href="/">
          <AppLogo className="inline md:hidden fill-app_orange-600" />
          <AppBanner className="hidden md:inline fill-app_orange-600" />
        </Link>

        {hasSearchInput(pathname) && <Search />}

        <div className="flex flex-row">
          {isClient && (
            <Button
              className="hover:text-app_orange-600"
              radius="full"
              onClick={handleToggleTheme}
              startContent={userTheme.icon}
              isIconOnly
              variant="light"
            />
          )}
        </div>
      </div>
    </header>
  ) : (
    <></>
  );
}
