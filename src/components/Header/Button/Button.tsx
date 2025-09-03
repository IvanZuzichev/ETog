import type { FC, ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button button--${size} button--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
