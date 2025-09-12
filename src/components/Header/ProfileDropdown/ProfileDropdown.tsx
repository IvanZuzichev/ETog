import type { FC } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { useTheme } from '../../../theme/ThemeContext'; 
import './ProfileDropdown.css';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (menuItem: string) => void;
}

const menuItems = [
  { id: 'profile', label: 'Аккаунт' },
  { id: 'account', label: 'Мой профиль' },
  { id: 'config', label: 'Настройки' },
];

export const ProfileDropdown: FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  onMenuItemClick,
}) => {
  const { theme } = useTheme(); 

  const handleItemClick = (id: string) => {
    onMenuItemClick(id);
    onClose();
  };

  return (
    <Dropdown isOpen={isOpen} onClose={onClose} position='right'>
      {menuItems.map(item => (
        <DropdownItem
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          variant='primary'
          size='medium'
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text
          }} 
        >
          {item.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};