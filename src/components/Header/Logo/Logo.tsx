import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../../assets/logo/Logo-Normal.png';
import './Logo.scss';

interface LogoProps {
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

// Компонент для логотипа
export const Logo: FC<LogoProps> = ({ onClick, size = 'medium' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Переход на главную страницу, нажимая на иконку логотипа
      navigate('/');
    }
  };

  return (
    <div className={`logo logo--${size}`} onClick={handleClick}>
      <img src={logoImage} alt='ETog' className='logo__image' />
    </div>
  );
};
