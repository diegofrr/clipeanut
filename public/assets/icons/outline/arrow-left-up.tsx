import type { SVGProps } from '../@types';

export function ArrowLeftUpIcon({ stroke, size, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      strokeWidth={stroke || 1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M18 18L6 6m0 0h9M6 6v9" />
    </svg>
  );
}
