import type { FC } from 'react';
import logoImage from '../../../assets/logo/Logo-Normal.png';
import './Logo.css';

interface LogoProps {
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const Logo: FC<LogoProps> = ({ onClick, size = 'medium' }) => {
  return (
    <div className={`logo logo--${size}`} onClick={onClick}>
      <img src={logoImage} alt='ETog' className='logo__image' />
    </div>
  );
};
