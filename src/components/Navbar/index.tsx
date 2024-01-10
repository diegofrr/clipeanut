'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { IconMoon, IconSearch, IconSettings, IconSun } from '@tabler/icons-react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
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

  return !isClient ? null : (
    <Navbar isBordered maxWidth="xl">
      <NavbarBrand className="mr-4">
        <Link href={'/'} className="text-lg font-bold cursor-pointer text-app_orange-600">
          Clipeanut
        </Link>
      </NavbarBrand>

      <Input
        classNames={{
          base: 'max-w-full sm:max-w-md h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
        }}
        placeholder="Pesquisar no Clipeanut"
        size="sm"
        radius="full"
        startContent={<IconSearch size={18} />}
        type="search"
      />

      <NavbarContent as="div" className="items-center" justify="end">
        <Button
          isIconOnly
          variant="light"
          aria-label="Alterar tema"
          onClick={handleToggleTheme}
          className="dark:hover:bg-neutral-900"
        >
          {resolvedTheme === 'dark' ? (
            <IconMoon className="text-neutral-200" />
          ) : (
            <IconSun className="text-neutral-800" />
          )}
        </Button>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>MENU</DropdownTrigger>
          <DropdownMenu closeOnSelect={false} aria-label="Profile Actions" variant="flat">
            <DropdownItem
              isReadOnly
              showDivider
              key="profile"
              className="gap-2 mb-4 cursor-default hover:bg-none ext-xl  pointer-events-none flex-shrink-0"
            >
              <span className="text-xs text-default-600">Instância</span>
              <p className="font-semibold">{instance}</p>
              <span className="text-xs italic text-default-600">Região: {region}</span>
            </DropdownItem>

            <DropdownItem key="settings" closeOnSelect={true} startContent={<IconSettings />}>
              <Link href="/settings">Configurações</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
