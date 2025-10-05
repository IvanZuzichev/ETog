// Хук для работы с безопасностью
import { useCallback } from 'react';
import CryptoJS from 'crypto-js';

// Ключ шифрования (в продакшене храни в .env)
const ENCRYPTION_KEY = (import.meta as any).env.VITE_ENCRYPTION_KEY || 'etog-default-secret-key';

export const useSecureStorage = () => {
  // Шифрование данных
  const encryptData = useCallback((data: string): string => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  }, []);

  // Дешифрование данных
  const decryptData = useCallback((cipherText: string): string | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }, []);

  // Безопасное сохранение в localStorage
  const setSecureItem = useCallback(
    (key: string, data: string): void => {
      try {
        const encrypted = encryptData(data);
        localStorage.setItem(key, encrypted);
      } catch (error) {
        console.error('Error setting secure item:', error);
      }
    },
    [encryptData]
  );

  // Безопасное получение из localStorage
  const getSecureItem = useCallback(
    (key: string): string | null => {
      try {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;

        return decryptData(encrypted);
      } catch (error) {
        console.error('Error getting secure item:', error);
        return null;
      }
    },
    [decryptData]
  );

  // Удаление элемента
  const removeSecureItem = useCallback((key: string): void => {
    localStorage.removeItem(key);
  }, []);

  // Очистка всех зашифрованных данных
  const clearSecureStorage = useCallback((): void => {
    localStorage.clear();
  }, []);

  return {
    encryptData,
    decryptData,
    setSecureItem,
    getSecureItem,
    removeSecureItem,
    clearSecureStorage,
  };
};
