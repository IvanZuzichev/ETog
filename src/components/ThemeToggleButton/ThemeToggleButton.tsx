import React from 'react';
import { useTheme } from '../../theme/ThemeContext';

interface ThemeToggleButtonProps {
  className?: string;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ 
  className = '' 
}) => {
  const { toggleTheme, themeName } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Переключить на ${themeName === 'light' ? 'тёмную' : 'светлую'} тему`}
      style={{ width: '100px', border: '0' }} 
    >
      {themeName === 'light' ? '🌙' : '☀️'}
    </button>
  );
};