import type { FC, ReactNode } from 'react';
import './Dropdown.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface DropdownProps {
  isOpen: boolean;
  children: ReactNode;
  position?: 'left' | 'right';
}

export const Dropdown: FC<DropdownProps> = ({ isOpen, children, position = 'right' }) => {
  useThemeApply();
  if (!isOpen) return null;

  return (
    <div className={`dropdown dropdown--${position}`}>
      {children}
    </div>
  );
};