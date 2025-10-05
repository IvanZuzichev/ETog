import type { FC } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { PROFILE_MENU_ITEMS } from '../../../store/constants/profileMenuConstants';
import './ProfileDropdown.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (menuItem: string) => void;
}
// Компонент для выпадающего списка справа
export const ProfileDropdown: FC<ProfileDropdownProps> = ({ isOpen, onClose, onMenuItemClick }) => {
  useThemeApply();

  const handleItemClick = (id: string) => {
    onMenuItemClick(id);
    onClose();
  };

  return (
    <Dropdown isOpen={isOpen} onClose={onClose} position='right'>
      {PROFILE_MENU_ITEMS.map(item => (
        <DropdownItem
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          variant='primary'
          size='medium'
          className='profile-dropdown-item'
        >
          {item.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};
