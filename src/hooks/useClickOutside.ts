import { useEffect } from 'react';
import type { RefObject } from 'react';

// Хук для того чтобы нажимая вне зоны правого и левого выпадающих списков в Хедер (Header) они закрывались
export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
