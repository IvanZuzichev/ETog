import type { FC, ReactNode } from 'react';
import { useTheme } from '../../../theme/ThemeContext'; 
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
  const { theme } = useTheme();

  if (!isOpen) return null;

  const dropdownStyle = {
    backgroundColor: theme.colors.background,
    borderColor: `${theme.colors.primary}30`,
    color: theme.colors.text
  };

  return (
    <div 
      className={`dropdown dropdown--${position}`}
      style={dropdownStyle}
    >
      {children}
    </div>
  );
};