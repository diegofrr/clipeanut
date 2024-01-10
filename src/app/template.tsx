import NavBar from '@/components/Navbar';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
