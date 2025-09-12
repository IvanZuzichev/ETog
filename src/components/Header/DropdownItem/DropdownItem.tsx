import type { FC, ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../../theme/ThemeContext';
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
  const { theme } = useTheme();

  const dropdownItemStyle = {
    backgroundColor: variant === 'secondary' ? 
      `${theme.colors.primary}20` : 'transparent',
    color: theme.colors.text,
    borderBottomColor: `${theme.colors.primary}20`
  };

  return (
    <button
      className={`dropdown-item dropdown-item--${size} dropdown-item--${variant} ${className}`}
      style={dropdownItemStyle}
      {...props}
    >
      {children}
    </button>
  );
};