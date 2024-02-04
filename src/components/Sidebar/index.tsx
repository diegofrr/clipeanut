'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tooltip } from '@nextui-org/react';
import { useWindowSize } from 'usehooks-ts';
import { hasSidebar } from './utils';
import { links } from './links';

export default function Sidebar() {
  const pathname = usePathname();
  const { width } = useWindowSize();

  return hasSidebar(pathname) ? (
    <nav className="bottom-0 w-full h-16 md:h-auto md:w-20 lg:w-32 fixed left-0 md:top-16 bg-white dark:bg-black p-0 md:py-6 z-50">
      <div className="w-full h-full flex flex-col justify-between md:justify-start items-center">
        <ul className="flex relative h-full flex-row w-full md:w-auto md:flex-col justify-around md:justify-start items-center gap-6">
          {links.map((link) => (
            <Tooltip
              key={link.name}
              content={link.name}
              placement={width < 768 ? 'top' : 'right'}
              showArrow
              closeDelay={0}
              radius="full"
            >
              <li className="w-auto md:w-full hover:text-app_orange-600">
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
