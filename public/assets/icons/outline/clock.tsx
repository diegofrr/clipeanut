import type { SVGProps } from '../@types';

export function ClockIcon({ stroke, size, ...props }: SVGProps) {
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
        <circle cx="12" cy="12" r="10" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l2.5 2.5" />
      </g>
    </svg>
  );
}
