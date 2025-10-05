import React, { useEffect } from 'react';
import { useThemeStore } from '../theme/ThemeContext';
import { applyThemeToDOM } from '../utils/themeUtils';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initializeTheme = useThemeStore(state => state.initializeTheme);
  const theme = useThemeStore(state => state.theme);

  // Инициализируем тему при загрузке
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Применяем тему при изменении
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
