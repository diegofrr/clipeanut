type HeaderRootProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export function HeaderRoot({ children, ...props }: HeaderRootProps) {
  return (
    <header {...props} className={'flex items-center w-full h-10 mb-6 ' + props.className || ''}>
      {children}
    </header>
  );
}
