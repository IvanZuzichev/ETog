// Хук для защита чувствительных данных
import { useCallback } from 'react';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = (import.meta as any).env.VITE_ENCRYPTION_KEY || 'etog-default-secret-key';

export const useDataProtection = () => {
  // Хеширование данных
  const hashData = useCallback((data: string): string => {
    return CryptoJS.SHA256(data).toString();
  }, []);

  // Создание соли для дополнительной безопасности
  const generateSalt = useCallback((): string => {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }, []);

  // Хеширование с солью
  const hashWithSalt = useCallback((data: string, salt: string): string => {
    return CryptoJS.PBKDF2(data, salt, { keySize: 256 / 32 }).toString();
  }, []);

  // Шифрование объекта
  const encryptObject = useCallback(<T extends object>(data: T): string => {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
  }, []);

  // Дешифрование объекта
  const decryptObject = useCallback(<T extends object>(cipherText: string): T | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
      const jsonString = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error('Error decrypting object:', error);
      return null;
    }
  }, []);

  // Генерация безопасного ID
  const generateSecureId = useCallback((): string => {
    return CryptoJS.lib.WordArray.random(32).toString();
  }, []);

  return {
    hashData,
    generateSalt,
    hashWithSalt,
    encryptObject,
    decryptObject,
    generateSecureId,
  };
};
