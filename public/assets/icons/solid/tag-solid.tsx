import type { SVGProps } from '../@types';

export function TagIconSolid({ stroke, size, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      strokeWidth={stroke || 1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.858 20h-2.637c-3.875 0-5.813 0-7.017-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.204-6.828C4.408 4 6.346 4 10.22 4h2.637c2.227 0 3.341 0 4.27.501c.93.502 1.52 1.42 2.701 3.259l.681 1.06C21.503 10.366 22 11.14 22 12c0 .86-.497 1.634-1.49 3.18l-.68 1.06c-1.181 1.838-1.771 2.757-2.701 3.259c-.93.501-2.044.501-4.271.501M7 7.054c.414 0 .75.316.75.706v8.475c0 .39-.336.706-.75.706s-.75-.316-.75-.706V7.76c0-.39.336-.706.75-.706"
        clipRule="evenodd"
      />
    </svg>
  );
}
