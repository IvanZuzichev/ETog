// src/theme/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Theme, ThemeName } from './theme';
import { lightTheme, darkTheme } from './theme';
import Cookies from 'js-cookie';
import { applyThemeToDOM } from '../utils/themeUtils';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  themeName: ThemeName;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_COOKIE_KEY = 'theme';
const THEME_STORAGE_KEY = 'theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getInitialTheme = (): Theme => {
    const savedThemeCookie = Cookies.get(THEME_COOKIE_KEY) as ThemeName;
    const savedThemeStorage = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    const savedTheme = savedThemeCookie || savedThemeStorage;
    
    if (savedTheme === 'dark') return darkTheme;
    if (savedTheme === 'light') return lightTheme;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? darkTheme : lightTheme;
  };

  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyThemeToDOM(currentTheme);
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme.name);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme.name === 'light' ? darkTheme : lightTheme;
      
      Cookies.set(THEME_COOKIE_KEY, newTheme.name, { 
        expires: 365,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      localStorage.setItem(THEME_STORAGE_KEY, newTheme.name);
      applyThemeToDOM(newTheme);
      
      return newTheme;
    });
  };

  const value: ThemeContextType = {
    theme: currentTheme,
    toggleTheme,
    isDark: currentTheme.name === 'dark',
    themeName: currentTheme.name as ThemeName
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};