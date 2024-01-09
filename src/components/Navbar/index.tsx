'use client';

import Link from 'next/link';
import navLinks from './navLinks';
import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';

export default function NavBar() {
  const { theme, setTheme } = useTheme();

  function handleToggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <nav className="bg-transparent bg-opacity-50 dark:bg-opacity-50 backdrop-blur-xl h-nav p-5 fixed top-0 left-0 right-0 z-max">
      <div className="max-w-screen-xl w-full h-full m-auto flex items-center justify-between">
        <ul className="flex gap-5">
          {navLinks.map((link) => (
            <li
              className="text-black dark:text-neutral-200 hover:opacity-70 font-bold transition-colors-opacity"
              key={link.path}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <Button onClick={handleToggleTheme}>Change theme</Button>
      </div>
    </nav>
  );
}
