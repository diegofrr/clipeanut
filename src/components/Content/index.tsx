import { usePathname } from 'next/navigation';

type ContentProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export default function Content({ children, ...props }: ContentProps) {
  const isHome = usePathname() === '/';

  return (
    <div
      {...props}
      className={
        `${isHome ? 'px-0 sm:px-6 md:px-0 md:pr-6' : 'pl-6 md:pl-0 pr-6'} lg:pr-12 py-6 mt-16 ` + props.className || ''
      }
    >
      {children}
    </div>
  );
}
