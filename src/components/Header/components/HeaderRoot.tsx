type HeaderRootProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export function HeaderRoot({ children, ...props }: HeaderRootProps) {
  return (
    <header {...props} className={'w-full mb-6 ' + props.className || ''}>
      {children}
    </header>
  );
}
