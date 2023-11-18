import styles from './button.module.scss'

type Props = {
  onClick?: () => void,
  children?: string,
  className?: string,
}

export const Button = ({onClick, children, className}: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </div>
  );
};