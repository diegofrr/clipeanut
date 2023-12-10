import Link from 'next/link';

export default function NavBar() {
  const links = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Trending',
      path: '/trendings'
    }
  ];

  return (
    <nav className="bg-zinc-950 h-16 p-5 fixed top-0 left-0 right-0 border-b border-b-zinc-900 text-zinc-300">
      <ul className="flex gap-5">
        {links.map((link) => (
          <li className="hover:text-zinc-50" key={link.path}>
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
