import styles from './custom-spinner.module.css';

import { Spinner } from '@nextui-org/react';
import './custom-spinner.css';

type CustomSpinnerProps = React.HTMLAttributes<HTMLElement> & {
  stroke?: 'lg' | 'sm' | 'md';
  size?: 'lg' | 'sm' | 'md';
  color?: 'current' | 'white' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  label?: string;
};

export default function CustomSpinner({ stroke, size, color, label, ...props }: CustomSpinnerProps) {
  return (
    <Spinner
      {...props}
      label={label}
      color={color}
      size={size}
      className={
        `
      ${!color && styles['custom-color']} 
      ${stroke && styles[`size-${stroke}`]}
    ` + props.className || ''
      }
    />
  );
}
