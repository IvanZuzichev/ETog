import type { FC } from 'react';
import { DropdownBurger } from '../DropDownBurger/DropDownBurger';
import { DropdownItem } from '../DropdownItem/DropdownItem';

interface BurgerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (menuItem: string) => void;
}

const menuItems = [
  { id: 'account', label: 'Создать мероприятие' },
  { id: 'profile', label: 'История мероприятий' },
  { id: 'config', label: 'Конфигурация' },
  { id: 'subscribe', label: 'Подписка' },
];

export const BurgerDropdown: FC<BurgerDropdownProps> = ({
  isOpen,
  onClose,
  onMenuItemClick,
}) => {
  const handleItemClick = (label: string) => {
    onMenuItemClick(label);
    onClose();
  };

  return (
    <DropdownBurger isOpen={isOpen} onClose={onClose} position='left'>
      {menuItems.map(item => (
        <DropdownItem
          key={item.id}
          onClick={() => handleItemClick(item.label)}
          variant='primary'
          size='medium'
        >
          {item.label}
        </DropdownItem>
      ))}
    </DropdownBurger>
  );
};
