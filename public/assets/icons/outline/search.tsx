import type { SVGProps } from '../@types';

export function SearchIcon({ stroke, size, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      strokeWidth={stroke || 1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor">
        <circle cx="11.5" cy="11.5" r="9.5" />
        <path strokeLinecap="round" d="M18.5 18.5L22 22" />
      </g>
    </svg>
  );
}
