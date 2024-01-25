import type { SVGProps } from '../@types';

export function VideosIcon({ stroke, size, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      strokeWidth={stroke || 1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M9.99 10.91a1.485 1.485 0 0 1 1.615-.022l3.371 2.09c.538.334.774.91.774 1.432c0 .523-.236 1.099-.774 1.432l-3.371 2.09c-.54.334-1.157.28-1.615-.022a1.673 1.673 0 0 1-.74-1.41v-4.18c0-.593.289-1.114.74-1.41m.823 1.254c-.019.012-.063.056-.063.156v4.18c0 .1.044.144.063.156l.001.001l3.372-2.09c.021-.013.064-.059.064-.157s-.043-.143-.064-.157l-3.371-2.09z" />
        <path d="M8.7 1.25c-.22 0-.39 0-.536.016A2.75 2.75 0 0 0 5.71 3.87a2.888 2.888 0 0 0-2.055 2.721c-.6.18-1.119.465-1.543.923c-.652.705-.854 1.572-.862 2.586c-.007.975.167 2.207.382 3.736l.44 3.114c.168 1.196.305 2.168.518 2.929c.223.797.552 1.452 1.16 1.956c.604.5 1.32.715 2.166.817c.819.098 1.849.098 3.13.098h5.907c1.282 0 2.312 0 3.13-.098c.847-.102 1.563-.317 2.167-.817c.608-.504.937-1.16 1.16-1.956c.213-.761.35-1.733.519-2.93l.439-3.113c.216-1.53.39-2.761.382-3.736c-.008-1.014-.21-1.881-.862-2.586c-.424-.458-.943-.742-1.544-.923a2.888 2.888 0 0 0-2.054-2.72a2.75 2.75 0 0 0-2.454-2.605c-.147-.016-.316-.016-.536-.016zm10.11 5.078a1.383 1.383 0 0 0-1.348-1.078H6.538c-.669 0-1.212.47-1.349 1.078c.926-.078 2.06-.078 3.427-.078h6.768c1.366 0 2.5 0 3.427.078M16.769 3.75a1.25 1.25 0 0 0-1.092-.993a4.924 4.924 0 0 0-.417-.007H8.74c-.28 0-.361.001-.417.007a1.25 1.25 0 0 0-1.092.993zM3.213 8.533c.303-.327.758-.544 1.643-.662c.901-.12 2.108-.121 3.816-.121h6.656c1.708 0 2.915.002 3.816.121c.885.118 1.34.335 1.643.662c.296.32.457.755.463 1.579c.006.85-.15 1.97-.376 3.576l-.423 3c-.178 1.261-.302 2.133-.485 2.787c-.177.63-.384.965-.673 1.204c-.293.244-.687.4-1.388.484c-.719.086-1.658.087-3 .087h-5.81c-1.342 0-2.281-.001-3-.087c-.7-.085-1.095-.24-1.388-.483c-.289-.24-.496-.576-.673-1.205c-.183-.654-.307-1.526-.485-2.787l-.423-3c-.226-1.605-.382-2.726-.376-3.576c.006-.824.167-1.26.463-1.579" />
      </g>
    </svg>
  );
}