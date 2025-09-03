import type { FC, ReactNode } from 'react';
import './DropDownBurger.css';

interface DropdownBurgerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
}

export const DropdownBurger: FC<DropdownBurgerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
}) => {
  if (!isOpen) return null;

  return <div className={`dropdown dropdown--${position}`}>{children}</div>;
};
