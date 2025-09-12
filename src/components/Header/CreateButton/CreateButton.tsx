import type { FC } from 'react';
import { useState, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '../Button/Button';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useTheme } from '../../../theme/ThemeContext';
import './CreateButton.css';
import { BurgerDropdown } from '../BurgerDropdown';
import { useNavigate } from 'react-router-dom'; 

interface CreateButtonProps {
  onClick?: () => void;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const CreateButton: FC<CreateButtonProps> = ({
  onClick,
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
      case 'config':
        navigate('/Configuration');
        break;
      default:
        console.warn('Unknown menu item:', menuItemId);
    }
    setIsDropdownOpen(false);
  };

  const buttonStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.footerheaderText
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
        style={buttonStyle}
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