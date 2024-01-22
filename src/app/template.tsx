import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <Sidebar />
      {children}
    </>
  );
}
