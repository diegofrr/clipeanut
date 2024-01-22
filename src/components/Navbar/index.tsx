'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AppLogo } from '../../../public/assets';
import { links } from './links';
import { Tooltip } from '@nextui-org/react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-20 lg:w-32 fixed left-0 top-0 bottom-0 bg-black py-6">
      <div className="w-full h-full flex flex-col justify-start items-center">
        <AppLogo className="fill-app_orange-600 mb-16" />

        <ul className="flex flex-col justify-start items-center w-8 gap-8 ">
          {links.map((link) => (
            <Tooltip key={link.name} content={link.name} placement="right" showArrow closeDelay={0} radius="full">
              <li className="w-full hover:text-app_orange-600">
                <Link className="flex items-center justify-center w-full h-8" href={link.path}>
                  {pathname === link.path ? <link.solidIcon color="#E99B0C" /> : <link.icon />}
                </Link>
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
    </nav>
  );
}
