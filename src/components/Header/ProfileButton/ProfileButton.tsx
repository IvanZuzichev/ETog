import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import { Button } from '../Button/Button';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import './ProfileButton.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
import { useSecureStorage } from '../../../hooks/useSecureStorage';
import { useGlobalAvatar } from '../../../hooks/useGlobalAvatar';

interface ProfileButtonProps {
  onClick?: () => void;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ProfileButton: FC<ProfileButtonProps> = ({ size = 'medium' }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { avatar } = useGlobalAvatar();
  
  useThemeApply();
  useClickOutside(containerRef as React.RefObject<HTMLElement>, () => setIsDropdownOpen(false));

  const handleButtonClick = () => {
    navigate('/MyAccount');
  };

  return (
    <div className='profile-button-container' ref={containerRef}>
      <Button
        size={size}
        onClick={handleButtonClick}
        aria-label='Profile'
        aria-expanded={isDropdownOpen}
        className='profile-button profile-button--circular'
        variant='primary'
      >
        {avatar ? (
          <img 
            src={avatar} 
            alt='User avatar' 
            className='profile-button__avatar' 
          />
        ) : (
          <IoPersonSharp className='profile-button__icon' />
        )}
      </Button>
    </div>
  );
};