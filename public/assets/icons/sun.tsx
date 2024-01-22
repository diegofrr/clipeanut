import type { SVGProps } from './@types';

export function SunIcon({ stroke, size, ...props }: SVGProps) {
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
        <circle cx="12" cy="12" r="6" />
        <path
          strokeLinecap="round"
          d="M12 2v1m0 18v1m10-10h-1M3 12H2m17.07-7.07l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393"
        />
      </g>
    </svg>
  );
}
