'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import type { UserTheme } from './types';
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
import { PipedInstanceContext } from '@/contexts/pipedInstance';

export default function NavBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const { region, instance } = useContext(PipedInstanceContext);

  const [isClient, setIsClient] = useState(false);
  const [userTheme, setUserTheme] = useState<UserTheme>({ name: '', icon: <></> });
  const isSettings = usePathname() === '/settings';
  const router = useRouter();

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    setUserTheme({
      name: resolvedTheme === 'light' ? 'claro' : 'escuro',
      icon: resolvedTheme === 'light' ? <IconSun /> : <IconMoon />
    });
  }, [resolvedTheme]);

  function handleToggleTheme() {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <Navbar isBordered isBlurred={false} maxWidth="2xl" className="z-max">
      <Link href={'/'} className="cursor-pointer">
        <AppLogo className="inline sm:hidden fill-foreground" />
        <AppBanner className="hidden sm:inline fill-foreground" />
      </Link>

      <NavbarContent as="div" className="items-center" justify="end">
        {!isSettings && (
          <Input
            classNames={{
              base: 'sm:max-w-[420px] w-full h-10',
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
              className="gap-2 mb-4 cursor-default hover:bg-none ext-xl pointer-events-none flex-shrink-0"
            >
              <span className="text-xs text-default-600">Instância</span>
              <p className="font-semibold mb-2">{instance.name}</p>
              <Chip size="sm">Região: {region}</Chip>
            </DropdownItem>

            <DropdownItem
              onClick={() => router.push('/settings')}
              textValue="Settings"
              key="settings"
              closeOnSelect={true}
              startContent={<IconSettings />}
            >
              <span className="font-medium">Configurações</span>
            </DropdownItem>

            {isClient ? (
              <DropdownItem
                textValue="Toggle theme"
                className="font-medium"
                onClick={handleToggleTheme}
                startContent={userTheme.icon}
              >
                <span className="font-medium">Modo {userTheme.name}</span>
              </DropdownItem>
            ) : (
              <></>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
