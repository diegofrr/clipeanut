'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { links } from './links';
import { Tooltip } from '@nextui-org/react';
import { hasSidebar } from './utils';

export default function Sidebar() {
  const pathname = usePathname();

  return hasSidebar(pathname) ? (
    <nav className="w-20 lg:w-32 fixed left-0 top-16 bottom-0 bg-white dark:bg-black py-6">
      <div className="w-full h-full flex flex-col justify-start items-center">
        <ul className="flex flex-col justify-start items-center gap-6">
          {links.map((link) => (
            <Tooltip key={link.name} content={link.name} placement="right" showArrow closeDelay={0} radius="full">
              <li className="w-full hover:text-app_orange-600">
                <Link className="flex items-center justify-center h-10 w-10" href={link.path}>
                  {pathname === link.path ? <link.solidIcon color="#E99B0C" /> : <link.icon />}
                </Link>
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
    </nav>
  ) : (
    <></>
  );
}
