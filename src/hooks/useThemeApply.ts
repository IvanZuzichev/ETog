// src/hooks/useThemeApply.ts
import { useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { applyThemeToDOM } from '../utils/themeUtils';

export const useThemeApply = (): void => {
  const { theme } = useTheme();

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);
};