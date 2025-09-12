import type { FC } from 'react';
import { useState, useRef } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { Button } from '../Button/Button';
import { ProfileDropdown } from '../ProfileDropdown/ProfileDropdown';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useTheme } from '../../../theme/ThemeContext';
import { useNavigate } from 'react-router-dom'; 
import './ProfileButton.css';

interface ProfileButtonProps {
  onClick?: () => void;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ProfileButton: FC<ProfileButtonProps> = ({
  onClick,
  showText = true,
  size = 'medium',
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme(); 

  useClickOutside(containerRef as React.RefObject<HTMLElement>, () =>
    setIsDropdownOpen(false)
  );

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    onClick?.();
  };

  const handleMenuItemClick = (menuItemId: string) => {
    switch (menuItemId) {
      case 'account':
        navigate('/MyAccount');
        break;
      case 'profile':
        navigate('/Account');
        break;
      case 'config':
        navigate('/Configuration');
        break;
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
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.footerheaderText
        }}
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