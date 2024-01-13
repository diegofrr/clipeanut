'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { AppLogo, AppBanner } from '../../../public/assets';
import { IconMenuDeep, IconMoon, IconSearch, IconSettings, IconSun } from '@tabler/icons-react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarContent
} from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { PipedInstanceContext } from '@/contexts/pipedInstance';

export default function NavBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const { region, instance } = useContext(PipedInstanceContext);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  function handleToggleTheme() {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <Navbar isBordered isBlurred={false} maxWidth="xl">
      <Link href={'/'} className="cursor-pointer">
        <AppLogo className="inline sm:hidden" />
        <AppBanner className="hidden sm:inline" />
      </Link>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: 'sm:max-w-[320px] w-full h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
          }}
          placeholder="Pesquisar..."
          size="sm"
          radius="full"
          startContent={<IconSearch size={18} />}
          type="search"
        />

        {isClient && (
          <Button isIconOnly variant="light" aria-label="Alterar tema" onClick={handleToggleTheme}>
            {resolvedTheme === 'dark' ? (
              <IconMoon className="text-neutral-200" />
            ) : (
              <IconSun className="text-neutral-800" />
            )}
          </Button>
        )}

        <Dropdown backdrop="opaque" placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <IconMenuDeep />
            </Button>
          </DropdownTrigger>
          <DropdownMenu closeOnSelect={false} aria-label="Profile Actions" variant="flat">
            <DropdownItem
              textValue="Piped Details"
              isReadOnly
              showDivider
              key="profile"
              className="gap-2 mb-4 cursor-default hover:bg-none ext-xl  pointer-events-none flex-shrink-0"
            >
              <span className="text-xs text-default-600">Instância</span>
              <p className="font-semibold mb-2">{instance.name}</p>
              <Chip size="sm">Região: {region}</Chip>
            </DropdownItem>

            <DropdownItem textValue="Settings" key="settings" closeOnSelect={true} startContent={<IconSettings />}>
              <Link href="/settings" className="font-semibold">
                Configurações
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
