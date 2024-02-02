'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

import ModalCountry from './components/ModalCountry';
import ReactCountryFlag from 'react-country-flag';
import Search from './components/Search';
import Icons from '@/icons';

// import type { UserTheme } from './types';

// import { useTheme } from 'next-themes';
import { hasTopbar, hasSearchInput } from './utils';
import { AppBanner, AppLogo } from '../../../public/assets';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';

import { PIPED_VALUES } from '@/constants';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

export default function Topbar() {
  const pathname = usePathname();

  const { region, setRegion } = useContext(PipedInstanceContext);

  // const { setTheme, resolvedTheme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [countryList, setCountryList] = useState<string[]>(PIPED_VALUES.REGIONS);

  // const [isClient, setIsClient] = useState(false);
  // const [userTheme, setUserTheme] = useState<UserTheme>({ name: '', icon: <></> });

  // useEffect(() => setIsClient(true), []);

  // useEffect(() => {
  //   setUserTheme({
  //     name: resolvedTheme === 'light' ? 'claro' : 'escuro',
  //     icon: resolvedTheme === 'light' ? <Icons.Sun /> : <Icons.Moon />
  //   });
  // }, [resolvedTheme]);

  // function handleToggleTheme() {
  //   setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  // }

  function resetCountries() {
    setCountryList(PIPED_VALUES.REGIONS);
  }

  function onChangeSearch({ target: { value: search } }: React.ChangeEvent<HTMLInputElement>) {
    if (!search) return resetCountries();
    const newCountryList = countryList.filter((country) => country.toLowerCase().includes(search.toLowerCase()));
    setCountryList(newCountryList);
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
              <ReactCountryFlag className="pb-[2px]" countryCode={region} style={{ fontSize: 36 }} />
            </span>
          }
        >
          {region}
        </Button>

        <Modal
          onClose={resetCountries}
          placement="center"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="mx-6 p-2 md:p-6"
          size="5xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <Input
                    startContent={<Icons.Search size={14} />}
                    onChange={onChangeSearch}
                    type="search"
                    placeholder="Buscar"
                    size="sm"
                    radius="full"
                    className="max-w-sm h-10"
                    classNames={{
                      base: 'h-10',
                      input: 'h-10',
                      inputWrapper: 'h-10 py-0'
                    }}
                  />
                </ModalHeader>
                <ModalBody className="flex w-full gap-4 flex-row flex-wrap items-center justify-center">
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
