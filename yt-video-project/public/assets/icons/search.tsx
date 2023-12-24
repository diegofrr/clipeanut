import SVGProps from '@/types/SVGProps';

export default function SearchIcon(props: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color={props.color || 'currentColor'}
      strokeWidth={props.strokeWidth || '2'}
      className={props.className || ''}
      height={props.height || '24'}
      width={props.width || '24'}
      fill={props.fill || 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 21-4.3-4.3" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
}
