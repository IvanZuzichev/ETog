// Значения для темы
export interface Theme {
  name: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    footerheaderBg: string;
    footerheaderText: string;
    buttonBg?: string;
    buttonText?: string;
    contentBg: string;
    error: string;
    // Добавляем новые цвета
    cardBg?: string;
    cardBorder?: string;
    textPrimary?: string;
    textSecondary?: string;
    accentColor?: string;
    accentColorTransparent?: string;
    borderLight?: string;
    buttonBgSecondary?: string;
    buttonHoverBg?: string;
    priceColor?: string;
    freePriceColor?: string;
    shadowHover?: string;
  };
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#7b1fa2',
    background: '#F1F0EE',
    text: '#000000',
    footerheaderBg: '#7b1fa2',
    footerheaderText: '#ffffff',
    buttonBg: '#ffffff',
    buttonText: '#000000',
    contentBg: '#ffffff',
    error: '#dc3545',
    
    // Новые цвета для светлой темы
    cardBg: '#FFFFFF',
    cardBorder: '#e5e7eb',
    textPrimary: '#000000',
    textSecondary: '#666666',
    accentColor: '#7b1fa2',
    accentColorTransparent: 'rgba(123, 31, 162, 0.8)',
    borderLight: '#EEEEEE',
    buttonBgSecondary: '#ffffff',
    buttonHoverBg: '#E4E2DF',
    priceColor: '#7B1FA2',
    freePriceColor: '#2E7D32',
    shadowHover: 'rgba(123, 31, 162, 0.15)'
  },
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#1e1e1e',
    background: '#121212',
    text: '#ffffff',
    footerheaderBg: '#1e1e1e',
    footerheaderText: '#ffffff',
    buttonBg: '#333333',
    buttonText: '#ffffff',
    contentBg: '#1e1e1e',
    error: '#ff6b6b',
    
    // Новые цвета для темной темы
    cardBg: '#1e1e1e',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    accentColor: '#bb86fc',
    accentColorTransparent: 'rgba(187, 134, 252, 0.8)',
    borderLight: 'rgba(255, 255, 255, 0.1)',
    buttonBgSecondary: '#2d2d2d',
    buttonHoverBg: '#3d3d3d',
    priceColor: '#bb86fc',
    freePriceColor: '#4CAF50',
    shadowHover: 'rgba(0, 0, 0, 0.3)'
  },
};

export type ThemeName = 'light' | 'dark';