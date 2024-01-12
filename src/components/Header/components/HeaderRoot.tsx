import { HeaderProps } from '../types';

export function HeaderRoot({ children, ...props }: HeaderProps) {
  return (
    <header {...props} className={`${props.className || ''} w-full mb-6 px-6 sm:p-0}`}>
      {children}
    </header>
  );
}
