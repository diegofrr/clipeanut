import type { SVGProps } from '../@types';

export function ClockIconSolid({ stroke, size, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      strokeWidth={stroke || 1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <mask id="solarClockCircleBold0">
          <g fill="none">
            <path fill="#fff" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
            <path
              fill="#000"
              fillRule="evenodd"
              d="M12 7.25a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V8a.75.75 0 0 1 .75-.75"
              clipRule="evenodd"
            />
          </g>
        </mask>
      </defs>
      <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#solarClockCircleBold0)" />
    </svg>
  );
}
