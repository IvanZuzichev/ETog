import React from 'react';
import { useTheme } from '../../../theme/ThemeContext';
import './ThemeSegmentedControl.scss';


interface ThemeToggleButtonProps {
  className?: string;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ 
  className = '' 
}) => {
  const { toggleTheme, themeName, theme } = useTheme();
  const isDark = themeName === 'dark';

  const toggleStyle = {
    color: theme.colors.text,
    borderRadius: '1.4rem',
    boxShadow: '0 0 8px rgba(108, 107, 107, 0.48)'
  };

  const textStyle = {
    color: theme.colors.text
  };

  return (
    <div className={`theme-toggle ${className}`} style={toggleStyle}>
      
      <div className="text-column">
        <p className="theme-toggle-text" style={textStyle}>Тема оформления</p>
      </div>
      
      <div className="control-column">
        <span className="theme-toggle__label" style={textStyle}>
          {isDark ? 'Темная' : 'Светлая'}
        </span>
        
        <label className="theme-toggle__switch">
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            className="theme-toggle__input"
          />
          <span className="theme-toggle__slider"></span>
        </label>
      </div>
      
    </div>
  );
};