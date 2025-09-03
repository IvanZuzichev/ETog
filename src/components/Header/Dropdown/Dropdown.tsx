import type { FC, ReactNode } from 'react';
import './Dropdown.css';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
}

export const Dropdown: FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
}) => {
  if (!isOpen) return null;

  return <div className={`dropdown dropdown--${position}`}>{children}</div>;
};
