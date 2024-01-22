import { usePathname } from 'next/navigation';

type ContentProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export default function Content({ children, ...props }: ContentProps) {
  const isHome = usePathname() === '/';

  return (
    <div {...props} className={`${isHome ? 'pr-0 sm:pr-6' : 'pr-6'} lg:pr-12 py-6 mt-16 ` + props.className || ''}>
      {children}
    </div>
  );
}
