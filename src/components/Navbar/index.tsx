'use client';

import Link from 'next/link';

import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { IconMoon, IconSettings, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  function handleToggleTheme() {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }

  return !isClient ? null : (
    <nav className="bg-transparent bg-opacity-50 dark:bg-opacity-50 backdrop-blur-xl h-nav p-5 fixed top-0 left-0 right-0 z-max">
      <div className="max-w-screen-xl w-full h-full m-auto flex items-center justify-between">
        <Link href="/" className="font-bold">
          Clipeanut
        </Link>
        <div>
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

          <Button
            href="/settings"
            as={Link}
            isIconOnly
            variant="light"
            aria-label="Alterar tema"
            className="dark:hover:bg-neutral-900"
          >
            <IconSettings className={`${resolvedTheme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
