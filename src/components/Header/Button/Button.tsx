import type { FC, ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../../theme/ThemeContext'; 
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
  const { theme } = useTheme(); 

  const buttonStyle = {
    backgroundColor: variant === 'primary' 
      ? theme.colors.primary 
      : `${theme.colors.primary}20`,
    color: variant === 'primary' 
      ? theme.colors.footerheaderText 
      : theme.colors.text
  };

  return (
    <button
      className={`button button--${size} button--${variant} ${className}`}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};