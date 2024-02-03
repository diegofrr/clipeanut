'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Icons from '@/icons';
import Search from './components/Search';
import ReactCountryFlag from 'react-country-flag';

import type { UserTheme } from './types';
import { AppBanner, AppLogo } from '../../../public/assets';
import { CommonUtils } from '@/utils';
import { hasTopbar, hasSearchInput } from './utils';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';

import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { useWindowSize } from 'usehooks-ts';
import { useTheme } from 'next-themes';

import { PIPED_VALUES } from '@/constants';

export default function Topbar() {
  const pathname = usePathname();

  const { region, setRegion } = useContext(PipedInstanceContext);
  const { setTheme, resolvedTheme } = useTheme();
  const { width } = useWindowSize();

  const [isClient, setIsClient] = useState(false);
  const [userTheme, setUserTheme] = useState<UserTheme>({ name: '', icon: <></> });

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    setUserTheme({
      name: resolvedTheme === 'light' ? 'claro' : 'escuro',
      icon: resolvedTheme === 'light' ? <Icons.Sun /> : <Icons.Moon />
    });
  }, [resolvedTheme]);

  const isMobile = () => width <= 640;

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

          <Dropdown backdrop="opaque" style={{ zIndex: 999999999 }}>
            <DropdownTrigger>
              <Button
                isIconOnly={isMobile()}
                variant="light"
                radius="full"
                className="font-bold"
                startContent={<ReactCountryFlag countryCode={region} style={{ fontSize: 20 }} />}
              >
                {!isMobile() && region}
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Countries" className="max-h-[86vh] mt-3 overflow-auto overflow-x-hidden">
              <DropdownSection title="Região do conteúdo">
                {PIPED_VALUES.REGIONS.map((country) => (
                  <DropdownItem
                    onClick={() => setRegion(country)}
                    key={country}
                    variant="light"
                    className="font-bold rounded-full hover:bg-foreground-100"
                    startContent={<ReactCountryFlag countryCode={country} style={{ fontSize: 20 }} />}
                  >
                    {CommonUtils.getCountryName(country)}
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  ) : (
    <></>
  );
}
