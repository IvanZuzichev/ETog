import { useEffect } from 'react';

export const useStorageSync = (
  key: string,
  callback: (value: string) => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        callback(e.newValue);
      }
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === `storage-${key}`) {
        callback(e.data.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleMessage);
    };
  }, [key, callback, ...dependencies]);
};

export const broadcastStorageChange = (key: string, value: string) => {

  window.localStorage.setItem(key, value);
  
  window.postMessage(
    { type: `storage-${key}`, value },
    window.location.origin
  );
};