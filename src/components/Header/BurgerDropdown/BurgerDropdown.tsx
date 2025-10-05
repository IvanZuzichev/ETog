import type { FC } from 'react';
import { DropdownBurger } from '../DropDownBurger/DropDownBurger';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { BURGER_MENU_ITEMS } from '../../../store/constants/burgerMenuConstants';
import './BurgerDropdown.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface BurgerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (menuItemId: string) => void;
}
// Компонент для выпадающего списка Хедер (Header) Слева
export const BurgerDropdown: FC<BurgerDropdownProps> = ({ isOpen, onClose, onMenuItemClick }) => {
  useThemeApply();
  // Нажатие на какую-то опредленную ячейку
  const handleItemClick = (id: string) => {
    onMenuItemClick(id);
    onClose();
  };

  return (
    <DropdownBurger isOpen={isOpen} position='left'>
      {BURGER_MENU_ITEMS.map(item => (
        <DropdownItem
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          variant='primary'
          size='medium'
          className='burger-dropdown-item'
        >
          {item.label}
        </DropdownItem>
      ))}
    </DropdownBurger>
  );
};
