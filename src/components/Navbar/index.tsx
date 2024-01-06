'use client';

import Link from 'next/link';
import navLinks from './navLinks';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xl h-nav p-5 text-zinc-300 fixed top-0 left-0 right-0 z-max">
      <ul className="flex gap-5 absolute left-5">
        {navLinks.map((link) => (
          <li className="hover:text-zinc-50" key={link.path}>
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>

      <div className="bg-red-900 h-8 w-1/2 max-w-sm rounded-full absolute right-5"></div>
    </nav>
  );
}
