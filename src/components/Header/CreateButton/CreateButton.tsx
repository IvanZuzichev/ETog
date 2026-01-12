import type { FC } from 'react';
import { useState, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '../Button/Button';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import './CreateButton.scss';
import { useNavigate } from 'react-router-dom';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface CreateButtonProps {
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const CreateButton: FC<CreateButtonProps> = ({ onClick, size = 'medium' }) => {
  useThemeApply();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsDropdownOpen(false));

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    onClick?.();
  };

  const handleMenuItemClick = (menuItemId: string) => {
    switch (menuItemId) {
      case 'create':
        navigate('/CreateEvent');
        break;
      case 'favorites':
        navigate('/FavoriteEvents');
        break;
      case 'recommendation':
        navigate('/RecommendationEvents');
        break;
      case 'subscribe':
        navigate('/Subscribers');
        break;
      default:
        console.warn('Unknown menu item:', menuItemId);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className='create-button-container' ref={containerRef}>
      <Button
        size={size}
        onClick={handleButtonClick}
        aria-label='Menu'
        aria-expanded={isDropdownOpen}
        className='create-button'
        variant='primary'
      >
        <GiHamburgerMenu className='create-button__icon' />
      </Button>

      <Dropdown isOpen={isDropdownOpen} position='left'>
        <DropdownItem onClick={() => handleMenuItemClick('create')}>
          Создать мероприятие
        </DropdownItem>
        <DropdownItem onClick={() => handleMenuItemClick('favorites')}>
          Избранное
        </DropdownItem>
        <DropdownItem onClick={() => handleMenuItemClick('recommendation')}>
          Рекомендации
        </DropdownItem>
        <DropdownItem onClick={() => handleMenuItemClick('subscribe')}>
          Подписки
        </DropdownItem>
      </Dropdown>
    </div>
  );
};