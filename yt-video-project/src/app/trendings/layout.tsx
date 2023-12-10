import type { Metadata } from 'next';
import NavBar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Trending Videos'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-950 h-full w-full p-5">
      <NavBar />
      {children}
    </div>
  );
}
