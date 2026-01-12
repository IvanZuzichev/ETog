import { useState, useEffect } from 'react';
import { useSecureStorage } from './useSecureStorage';

// Создаем простую реализацию EventEmitter для браузера
class SimpleEventEmitter {
  private events: Record<string, Function[]> = {};

  on(event: string, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: Function) {
    if (!this.events[event]) return;
    const index = this.events[event].indexOf(listener);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
}

// Создаем глобальный экземпляр
const avatarEmitter = new SimpleEventEmitter();
const AVATAR_CHANGED_EVENT = 'avatar-changed';

export const useGlobalAvatar = () => {
  const { getSecureItem, setSecureItem } = useSecureStorage();
  const [avatar, setAvatar] = useState<string>(() => getSecureItem('user_avatar') || '');

  useEffect(() => {
    const handleAvatarChange = (newAvatar: string) => {
      setAvatar(newAvatar);
    };

    avatarEmitter.on(AVATAR_CHANGED_EVENT, handleAvatarChange);

    return () => {
      avatarEmitter.off(AVATAR_CHANGED_EVENT, handleAvatarChange);
    };
  }, []);

  const updateAvatar = (newAvatar: string) => {
    setSecureItem('user_avatar', newAvatar);
    avatarEmitter.emit(AVATAR_CHANGED_EVENT, newAvatar);
  };

  return { avatar, updateAvatar };
};