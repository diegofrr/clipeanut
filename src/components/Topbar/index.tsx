'use client';

import Link from 'next/link';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Icons from '@/icons';

import CountryFlag, { ReactCountryFlag } from 'react-country-flag';
import ModalCountry from './components/ModalCountry';
import Search from './components/Search';

import type { UserTheme } from './types';

import { useTheme } from 'next-themes';
import { hasTopbar, hasSearchInput } from './utils';
import { AppBanner, AppLogo } from '../../../public/assets';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';

import { PIPED_VALUES } from '@/constants';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

export default function Topbar() {
  const pathname = usePathname();
  const countryList = PIPED_VALUES.REGIONS;
  const { region, setRegion } = useContext(PipedInstanceContext);

  const { setTheme, resolvedTheme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <AppLogo className="inline md:hidden fill-app_orange-600" />
          <AppBanner className="hidden md:inline fill-app_orange-600" />
        </Link>

        {hasSearchInput(pathname) && <Search />}

        {/* {isClient ? (
          <Button radius="full" onClick={handleToggleTheme} startContent={userTheme.icon} isIconOnly variant="light" />
        ) : (
          <></>
        )} */}

        <Button
          variant="light"
          radius="full"
          className="font-bold"
          onClick={onOpen}
          startContent={
            <span className="flex items-center justify-center cursor-pointer rounded-full overflow-hidden h-6 w-6 hover:brightness-125">
              <ReactCountryFlag className="pb-[2.5px]" countryCode={region} style={{ fontSize: 36 }} />
            </span>
          }
        >
          {region}
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="mx-6 p-6" size="4xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <span className="text-center w-full">Selecione a região</span>
                </ModalHeader>
                <ModalBody className="flex w-full flex-row flex-wrap items-center justify-center">
                  {countryList.map((country) => (
                    <div
                      key={country}
                      onClick={() => {
                        setRegion(country);
                        onClose();
                      }}
                    >
                      <ModalCountry country={country} />
                    </div>
                  ))}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </header>
  ) : (
    <></>
  );
}
