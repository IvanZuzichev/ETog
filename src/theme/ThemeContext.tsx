// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Theme, ThemeName } from './theme';
import { lightTheme, darkTheme } from './theme';
import Cookies from 'js-cookie';
import { useStorageSync, broadcastStorageChange } from '../hooks/useStotageSync';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  themeName: ThemeName;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_COOKIE_KEY = 'theme';
const THEME_STORAGE_KEY = 'theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const handleThemeSync = useCallback((themeValue: string) => {
    const themeName = themeValue as ThemeName;
    if (themeName === 'dark') {
      setCurrentTheme(darkTheme);
    } else if (themeName === 'light') {
      setCurrentTheme(lightTheme);
    }
  }, []);

  useStorageSync(THEME_STORAGE_KEY, handleThemeSync, [handleThemeSync]);

  useEffect(() => {
    const savedTheme = Cookies.get(THEME_COOKIE_KEY) as ThemeName;
    
    if (savedTheme === 'dark') {
      setCurrentTheme(darkTheme);
    } else if (savedTheme === 'light') {
      setCurrentTheme(lightTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? darkTheme : lightTheme);
    }
  }, []);

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme.name === 'light' ? darkTheme : lightTheme;
      
      Cookies.set(THEME_COOKIE_KEY, newTheme.name, { 
        expires: 365,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      broadcastStorageChange(THEME_STORAGE_KEY, newTheme.name);
      
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