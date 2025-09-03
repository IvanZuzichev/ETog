import type { FC } from 'react';
import { useState, useRef } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { Button } from '../Button/Button';
import { ProfileDropdown } from '../ProfileDropdown/ProfileDropdown';
import { useClickOutside } from '../../../hooks/useClickOutside';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef as React.RefObject<HTMLElement>, () =>
    setIsDropdownOpen(false)
  );

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    onClick?.();
  };

  const handleMenuItemClick = (menuItem: string) => {
    alert(menuItem);
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
