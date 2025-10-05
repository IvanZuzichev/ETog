import { useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';

// Хук для работы с темой приложения
export const useThemeApply = (): void => {
  const { theme } = useTheme();

  useEffect(() => {
    // Тема уже применяется в ThemeProvider, этот хук теперь для совместимости
    console.log('Theme applied:', theme.name);
  }, [theme]);
};
