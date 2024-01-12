type HeaderTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function HeaderTitle({ children, ...props }: HeaderTitleProps) {
  return (
    <div {...props} className={'flex items-center justify-start gap-2 ' + props.className || ''}>
      {children}
    </div>
  );
}
