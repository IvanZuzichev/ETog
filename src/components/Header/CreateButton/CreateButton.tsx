import type { FC } from 'react';
import { useState, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '../Button/Button';
import { useClickOutside } from '../../../hooks/useClickOutside';
import './CreateButton.scss';
import { BurgerDropdown } from '../BurgerDropdown';
import { useNavigate } from 'react-router-dom';
import { useThemeApply } from '../../..//hooks/useThemeApply';

interface CreateButtonProps {
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}
// Компонент для левого выпадающего списка
export const CreateButton: FC<CreateButtonProps> = ({ onClick, size = 'medium' }) => {
  useThemeApply();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef as React.RefObject<HTMLElement>, () => setIsDropdownOpen(false));

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    onClick?.();
  };
  // Выбор кнопки и переход на определенную страницу
  const handleMenuItemClick = (menuItemId: string) => {
    switch (menuItemId) {
      // Страницу создания мероприятия
      case 'create':
        navigate('/CreateEvent');
        break;
      // Страницу избранных мероприятий
      case 'favorites':
        navigate('/FavoriteEvents');
        break;
      // Страницу рекомендованных мероприятий
      case 'recommendation':
        navigate('/RecommendationEvents');
        break;
      // Страница подписки
      case 'subscribe':
        navigate('/Subscribers');
        break;
      // Страницы настроеек
      case 'config':
        navigate('/Configuration');
        break;
      // Проверка если вдруг при добавлении новой кнопки непраивльно ее добавили
      default:
        console.warn('Unknown menu item:', menuItemId);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className='profile-button-container' ref={containerRef}>
      <Button
        size={size}
        onClick={handleButtonClick}
        aria-label='Profile'
        aria-expanded={isDropdownOpen}
        className='profile-button'
        variant='primary'
      >
        <GiHamburgerMenu className='profile-button__icon' />
      </Button>

      <BurgerDropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
};
