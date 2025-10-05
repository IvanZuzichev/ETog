import type { FC, ButtonHTMLAttributes } from 'react';
import { useThemeApply } from '../../../hooks/useThemeApply';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}
// Компонент отвечающий за кнопки в выпадающих списках Хедер (Header)
export const Button: FC<ButtonProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  className = '',
  ...props
}) => {
  useThemeApply();
  return (
    <button className={`button button--${size} button--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};
