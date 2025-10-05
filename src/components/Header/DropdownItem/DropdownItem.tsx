import type { FC, ButtonHTMLAttributes } from 'react';
import './DropdownItem.scss';
import { useThemeApply } from '../../..//hooks/useThemeApply';
interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}
// Компонент отвечающий за кнопки выпадающего списка слева
export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  className = '',
  ...props
}) => {
  useThemeApply();
  return (
    <button className={`dropdown-item dropdown-item--${size} dropdown-item--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};
