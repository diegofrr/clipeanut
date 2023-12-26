import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-zinc-950 h-screen w-full p-5">{children}</div>;
}
