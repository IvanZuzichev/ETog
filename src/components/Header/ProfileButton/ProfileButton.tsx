import type { FC } from 'react';
import { useState, useRef } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { Button } from '../Button/Button';
import { ProfileDropdown } from '../ProfileDropdown/ProfileDropdown';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import './ProfileButton.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface ProfileButtonProps {
  onClick?: () => void;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Компонент, отвечающий за кнопку профиля
export const ProfileButton: FC<ProfileButtonProps> = ({ onClick, showText = true, size = 'medium' }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useThemeApply();
  useClickOutside(containerRef as React.RefObject<HTMLElement>, () => setIsDropdownOpen(false));

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    onClick?.();
  };

  // Выбор меню по нажатию на кнопку
  const handleMenuItemClick = (menuItemId: string) => {
    switch (menuItemId) {
      // Переход на страницу "Мой профиль"
      case 'account':
        navigate('/MyAccount');
        break;
      // Переход на страницу "Аккаунт"
      case 'profile':
        navigate('/Account');
        break;
      // Переход на страницу "Настройки"
      case 'config':
        navigate('/Configuration');
        break;
      default:
        // Проверка на ошибку если непраивльно добавили еще кнопки
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
        <IoPersonSharp className='profile-button__icon' />
        {showText && <span className='profile-button__text'>Профиль</span>}
      </Button>

      <ProfileDropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        onMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
};
