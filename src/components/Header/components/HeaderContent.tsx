type HeaderContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function HeaderContent({ children, ...props }: HeaderContentProps) {
  return (
    <div {...props} className={'w-full ' + props.className || ''}>
      {children}
    </div>
  );
}
