import type { FC } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (menuItem: string) => void;
}

const menuItems = [
  { id: 'account', label: 'Аккаунт' },
  { id: 'profile', label: 'Мой профиль' },
  { id: 'config', label: 'Конфигурация' },
];

export const ProfileDropdown: FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  onMenuItemClick,
}) => {
  const handleItemClick = (label: string) => {
    onMenuItemClick(label);
    onClose();
  };

  return (
    <Dropdown isOpen={isOpen} onClose={onClose} position='right'>
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
    </Dropdown>
  );
};
