import { useTheme } from '../../../theme/ThemeContext';
import './ThemeSegmentedControl.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
import { useEffect, useState } from 'react';

interface ThemeToggleButtonProps {
  className?: string;
}

// Компонент отвечающий за кнопку переключения темы веб-сайта
export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = () => {
  const { toggleTheme, isDark } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useThemeApply();

  useEffect(() => {
    setIsClient(true);
  }, []);
  // При долгой загрузки пользователя (Обраюотка ошибок)
  if (!isClient) {
    return (
      <div className={`theme-toggle`}>
        <div className='text-column'>
          <p className='theme-toggle-text'>Тема оформления</p>
        </div>
        <div className='control-column'>
          <span className='theme-toggle__label'>Загрузка...</span>
          <label className='theme-toggle__switch'>
            <input type='checkbox' checked={false} readOnly className='theme-toggle__input' />
            <span className='theme-toggle__slider'></span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className={`theme-toggle`}>
      <div className='text-column'>
        <p className='theme-toggle-text'>Тема оформления</p>
      </div>

      <div className='control-column'>
        <span className='theme-toggle__label'>{isDark ? 'Темная' : 'Светлая'}</span>

        <label className='theme-toggle__switch'>
          <input type='checkbox' checked={isDark} onChange={toggleTheme} className='theme-toggle__input' />
          <span className='theme-toggle__slider'></span>
        </label>
      </div>
    </div>
  );
};
