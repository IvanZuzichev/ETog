import type { FC, ButtonHTMLAttributes } from 'react';
import './DropdownItem.css';

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`dropdown-item dropdown-item--${size} dropdown-item--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
