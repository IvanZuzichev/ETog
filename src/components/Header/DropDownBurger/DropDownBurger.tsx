import type { FC, ReactNode } from 'react';
import './DropDownBurger.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
interface DropdownBurgerProps {
  isOpen: boolean;
  children: ReactNode;
  position?: 'left' | 'right';
}

export const DropdownBurger: FC<DropdownBurgerProps> = ({ isOpen, children, position = 'right' }) => {
  useThemeApply();
  if (!isOpen) return null;
  return <div className={`dropdown dropdown--${position}`}>{children}</div>;
};
