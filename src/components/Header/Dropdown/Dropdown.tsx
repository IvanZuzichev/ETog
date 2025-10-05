import type { FC, ReactNode } from 'react';
import './Dropdown.scss';
import { useThemeApply } from '../../..//hooks/useThemeApply';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
}
// Компонент для выпадающего списка слева
export const Dropdown: FC<DropdownProps> = ({ isOpen, children, position = 'right' }) => {
  useThemeApply();
  if (!isOpen) return null;

  return <div className={`dropdown dropdown--${position}`}>{children}</div>;
};
