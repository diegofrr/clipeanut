type ContentProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export default function Content({ children, ...props }: ContentProps) {
  return (
    <div {...props} className={'py-6 pr-0 sm:pr-6 ' + props.className || ''}>
      {children}
    </div>
  );
}
