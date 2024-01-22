type MainProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export default function Main({ children, ...props }: MainProps) {
  return (
    <main {...props} className={'absolute left-20 lg:left-32 top-0 right-0 bottom-0 ' + props.className || ''}>
      {children}
    </main>
  );
}
