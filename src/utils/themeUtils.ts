// Утилита для работы с темой
import type { Theme } from '../theme/theme';

export const applyThemeToDOM = (theme: Theme): void => {
  const root = document.documentElement;
  
  // Основные переменные
  root.style.setProperty('--background-color', theme.colors.background);
  root.style.setProperty('--text-color', theme.colors.text);
  root.style.setProperty('--primary-color', theme.colors.primary);
  root.style.setProperty('--footer-bg', theme.colors.footerheaderBg);
  root.style.setProperty('--footer-text', theme.colors.footerheaderText);
  root.style.setProperty('--content-bg', theme.colors.contentBg);
  root.style.setProperty('--error-color', theme.colors.error);
  
  // Переменные для кнопок
  root.style.setProperty('--button-bg', theme.colors.buttonBg || theme.colors.background);
  root.style.setProperty('--button-text', theme.colors.buttonText || theme.colors.text);
  root.style.setProperty('--button-hover-bg', theme.colors.buttonHoverBg || theme.colors.buttonBg || theme.colors.background);
  
  // Переменные для карточек
  root.style.setProperty('--card-bg', theme.colors.cardBg || theme.colors.contentBg);
  root.style.setProperty('--card-border', theme.colors.cardBorder || 'rgba(0, 0, 0, 0.1)');
  root.style.setProperty('--text-color-primary', theme.colors.textPrimary || theme.colors.text);
  root.style.setProperty('--text-color-secondary', theme.colors.textSecondary || theme.colors.text);
  root.style.setProperty('--accent-color', theme.colors.accentColor || theme.colors.primary);
  root.style.setProperty('--accent-color-transparent', theme.colors.accentColorTransparent || `rgba(${hexToRgb(theme.colors.accentColor || theme.colors.primary)}, 0.8)`);
  root.style.setProperty('--border-color-light', theme.colors.borderLight || 'rgba(0, 0, 0, 0.1)');
  root.style.setProperty('--button-bg-secondary', theme.colors.buttonBgSecondary || theme.colors.buttonBg || theme.colors.background);
  root.style.setProperty('--price-color', theme.colors.priceColor || theme.colors.accentColor || theme.colors.primary);
  root.style.setProperty('--free-price-color', theme.colors.freePriceColor || '#2E7D32');
  root.style.setProperty('--shadow-hover', theme.colors.shadowHover || 'rgba(0, 0, 0, 0.1)');
  
  // Устанавливаем атрибут data-theme
  root.setAttribute('data-theme', theme.name);
};

// Вспомогательная функция для преобразования hex в rgb
function hexToRgb(hex: string): string {
  hex = hex.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}