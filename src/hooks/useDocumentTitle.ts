import { useEffect } from 'react';

// Хук для установки заголовка при открытии новой страницы
export const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};
