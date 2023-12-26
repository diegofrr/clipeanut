'use client';

import Link from 'next/link';
import navLinks from './navLinks';

export default function NavBar() {
  return (
    <nav className="bg-zinc-950 h-16 p-5  border-b border-b-zinc-900 text-zinc-300">
      <ul className="flex gap-5">
        {navLinks.map((link) => (
          <li className="hover:text-zinc-50" key={link.path}>
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
