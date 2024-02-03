'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { usePathname } from 'next/navigation';

import Search from './components/Search';
import ReactCountryFlag from 'react-country-flag';

import { AppBanner, AppLogo } from '../../../public/assets';
import { CommonUtils } from '@/utils';
import { hasTopbar, hasSearchInput } from './utils';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';

import { PIPED_VALUES } from '@/constants';
import { PipedInstanceContext } from '@/contexts/pipedInstance';
import { useWindowSize } from 'usehooks-ts';

export default function Topbar() {
  const pathname = usePathname();

  const { region, setRegion } = useContext(PipedInstanceContext);
  const { width } = useWindowSize();

  const isMobile = () => width <= 640;

  return hasTopbar(pathname) ? (
    <header className="fixed top-0 left-0 px-6 lg:px-12 right-0 max-h-16 h-16 z-max bg-background">
      <div className="w-full h-full gap-2 sm:gap-6 flex flex-row justify-between items-center">
        <Link href="/">
          <AppLogo className="inline md:hidden fill-app_orange-600" />
          <AppBanner className="hidden md:inline fill-app_orange-600" />
        </Link>

        {hasSearchInput(pathname) && <Search />}

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
                  className="font-bold"
                  startContent={<ReactCountryFlag countryCode={country} style={{ fontSize: 20 }} />}
                >
                  {CommonUtils.getCountryName(country)}
                </DropdownItem>
              ))}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  ) : (
    <></>
  );
}
