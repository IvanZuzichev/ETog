// Утилита для работы стокенами
import CryptoJS from 'crypto-js';

const TOKEN_KEY = 'etog_auth_token';
const REFRESH_TOKEN_KEY = 'etog_refresh_token';
const ENCRYPTION_KEY = (import.meta as any).env.VITE_ENCRYPTION_KEY || 'etog-default-secret-key';

export const TokenStorage = {
  // Сохранение токена
  setToken: (token: string): void => {
    const encrypted = CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
    localStorage.setItem(TOKEN_KEY, encrypted);
  },

  // Получение токена
  getToken: (): string | null => {
    try {
      const encrypted = localStorage.getItem(TOKEN_KEY);
      if (!encrypted) return null;

      const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting token:', error);
      return null;
    }
  },

  // Сохранение refresh токена
  setRefreshToken: (refreshToken: string): void => {
    const encrypted = CryptoJS.AES.encrypt(refreshToken, ENCRYPTION_KEY).toString();
    localStorage.setItem(REFRESH_TOKEN_KEY, encrypted);
  },

  // Получение refresh токена
  getRefreshToken: (): string | null => {
    try {
      const encrypted = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!encrypted) return null;

      const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting refresh token:', error);
      return null;
    }
  },

  // Удаление токенов
  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Проверка наличия токена
  hasToken: (): boolean => {
    return !!TokenStorage.getToken();
  },
};
