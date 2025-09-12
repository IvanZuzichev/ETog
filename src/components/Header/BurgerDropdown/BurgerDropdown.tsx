import type { FC } from 'react';
import { DropdownBurger } from '../DropDownBurger/DropDownBurger';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { useTheme } from '../../../theme/ThemeContext';

interface BurgerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (menuItemId: string) => void;
}

const menuItems = [
  { id: 'create', label: 'Создать мероприятие' },
  { id: 'favorites', label: 'Избранные мероприятия' },
  { id: 'recommendation', label: 'Рекомендованные мероприятия' },
  { id: 'subscribe', label: 'Подписки' },
  { id: 'config', label: 'Настройки' },
];

export const BurgerDropdown: FC<BurgerDropdownProps> = ({
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
    <DropdownBurger isOpen={isOpen} onClose={onClose} position='left'>
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
    </DropdownBurger>
  );
};