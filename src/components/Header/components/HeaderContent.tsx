import { HeaderProps } from '../types';

export function HeaderContent({ children, ...props }: HeaderProps) {
  return (
    <div {...props} className={`${props.className || ''} w-full`}>
      {children}
    </div>
  );
}
