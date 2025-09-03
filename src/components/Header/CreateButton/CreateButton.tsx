import type { FC } from 'react';
import { useState, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '../Button/Button';
import { useClickOutside } from '../../../hooks/useClickOutside';

import './CreateButton.css';
import { BurgerDropdown } from '../BurgerDropdown';

interface CreateButtonProps {
  onClick?: () => void;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const CreateButton: FC<CreateButtonProps> = ({
  onClick,
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
