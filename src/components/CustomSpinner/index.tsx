import styles from './custom-spinner.module.css';

import { Spinner } from '@nextui-org/react';

type CustomSpinnerProps = {
  stroke?: 'lg' | 'sm' | 'md';
  size?: 'lg' | 'sm' | 'md';
  color?: 'current' | 'white' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  label?: string;
};

export default function CustomSpinner(props: CustomSpinnerProps) {
  return (
    <Spinner
      label={props.label}
      color={props.color}
      size={props.size}
      className={`
      ${!props.color && styles['custom-color']} 
      ${props.stroke && styles[`size-${props.stroke}`]}
      `}
    />
  );
}
