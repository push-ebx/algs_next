import { CSSProperties } from 'react';
import styles from './input.module.scss'

type Props = {
  placeholder?: string,
  className?: string,
  style?: CSSProperties,
  onChange: (value: string) => void,
  value?: string
}

export const Input = ({
  placeholder,
  className,
  style,
  onChange,
  value,
}: Props) => {
  return (
    <input
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      style={style}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};