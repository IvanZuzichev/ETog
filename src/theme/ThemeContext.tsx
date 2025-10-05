import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, ThemeName } from './theme';
import { lightTheme, darkTheme } from './theme';
import { applyThemeToDOM } from '../utils/themeUtils';
import Cookies from 'js-cookie';

interface ThemeStore {
  theme: Theme;
  themeName: ThemeName;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (themeName: ThemeName) => void;
  initializeTheme: () => void;
}

const THEME_COOKIE_KEY = 'theme';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: lightTheme,
      themeName: 'light',
      isDark: false,

      initializeTheme: () => {
        const savedThemeCookie = Cookies.get(THEME_COOKIE_KEY) as ThemeName;
        const savedThemeStorage = localStorage.getItem('theme') as ThemeName;
        const savedTheme = savedThemeCookie || savedThemeStorage;

        let initialTheme: Theme;
        let initialThemeName: ThemeName;

        if (savedTheme === 'dark') {
          initialTheme = darkTheme;
          initialThemeName = 'dark';
        } else if (savedTheme === 'light') {
          initialTheme = lightTheme;
          initialThemeName = 'light';
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          initialTheme = prefersDark ? darkTheme : lightTheme;
          initialThemeName = prefersDark ? 'dark' : 'light';
        }

        applyThemeToDOM(initialTheme);

        set({
          theme: initialTheme,
          themeName: initialThemeName,
          isDark: initialThemeName === 'dark',
        });
      },

      toggleTheme: () => {
        const current = get();
        const newThemeName = current.themeName === 'light' ? 'dark' : 'light';
        const newTheme = newThemeName === 'light' ? lightTheme : darkTheme;

        Cookies.set(THEME_COOKIE_KEY, newTheme.name, {
          expires: 365,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        applyThemeToDOM(newTheme);

        set({
          theme: newTheme,
          themeName: newThemeName,
          isDark: newThemeName === 'dark',
        });
      },

      setTheme: (themeName: ThemeName) => {
        const newTheme = themeName === 'light' ? lightTheme : darkTheme;

        Cookies.set(THEME_COOKIE_KEY, newTheme.name, {
          expires: 365,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        applyThemeToDOM(newTheme);

        set({
          theme: newTheme,
          themeName: themeName,
          isDark: themeName === 'dark',
        });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          applyThemeToDOM(state.theme);
        }
      },
    }
  )
);

// Хук для использования темы (аналогичный интерфейс)
export const useTheme = () => {
  const { theme, toggleTheme, isDark, themeName, setTheme } = useThemeStore();
  return { theme, toggleTheme, isDark, themeName, setTheme };
};
