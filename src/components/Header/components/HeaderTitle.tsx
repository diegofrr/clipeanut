type HeaderTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  icon?: JSX.Element;
};

export function HeaderTitle({ children, icon = <></>, ...props }: HeaderTitleProps) {
  return (
    <div {...props} className={'flex items-center justify-start gap-2 text-xl sm:text-2xl ' + props.className || ''}>
      {icon} <h1 className="font-bold">{children}</h1>
    </div>
  );
}
