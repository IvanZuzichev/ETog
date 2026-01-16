// ThemeToggleCompact.tsx
import { useTheme } from '../../../theme/ThemeContext';
import './ThemeToggleCompact.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
import { useEffect, useState } from 'react';

interface ThemeToggleCompactProps {
  className?: string;
}

// Компактный тумблер темы для страницы профиля
export const ThemeToggleCompact: React.FC<ThemeToggleCompactProps> = () => {
  const { toggleTheme, isDark } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useThemeApply();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className='profile-theme-toggle'>
        <p className='profile-theme-toggle__text'>Тема оформления</p>
        <div className='profile-theme-toggle__container'>
          <span className='profile-theme-toggle__label'>Загрузка...</span>
          <label className='profile-theme-toggle__switch'>
            <input type='checkbox' checked={false} readOnly />
            <span className='profile-theme-toggle__slider'></span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className='profile-theme-toggle'>
      <p className='profile-theme-toggle__text'>Тема оформления</p>
      <div className='profile-theme-toggle__container'>
        <span className='profile-theme-toggle__label'>{isDark ? 'Темная' : 'Светлая'}</span>
        <label className='profile-theme-toggle__switch'>
          <input 
            type='checkbox' 
            checked={isDark} 
            onChange={toggleTheme} 
          />
          <span className='profile-theme-toggle__slider'></span>
        </label>
      </div>
    </div>
  );
};