import { useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';

export const useThemeApply = (): void => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', theme.colors.background);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--footer-bg', theme.colors.footerheaderBg);
    root.style.setProperty('--footer-text', theme.colors.footerheaderText);
    root.style.setProperty('--button-bg', theme.colors.buttonBg || theme.colors.background);
    root.style.setProperty('--button-text', theme.colors.buttonText || theme.colors.text);
  }, [theme]);
};