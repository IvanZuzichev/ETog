import React from 'react';
import { Logo } from './Logo/Logo';
import { ProfileButton } from './ProfileButton/ProfileButton';
import { InputField } from './InputField/InputField';
import { CreateButton } from './CreateButton/CreateButton';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigate } from 'react-router-dom'; 
import './Header.css';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = (searchText: string) => {
    if (searchText.trim() === '') {
      alert('Введите текст для поиска');
    } else {
      alert(`Ищем: ${searchText}`);
    }
  };

  const headerStyle = {
    backgroundColor: theme.colors.footerheaderBg,
    color: theme.colors.footerheaderText
  };

  return (
    <header className='header' style={headerStyle}>
      <div className='header__left'>
        <CreateButton size='medium' />
        <Logo onClick={handleLogoClick} size='medium' />
      </div>

      <InputField onSearch={handleSearch} size='medium' />

      <div className='header__actions'>
        <ProfileButton showText={true} size='medium' />
      </div>
    </header>
  );
};