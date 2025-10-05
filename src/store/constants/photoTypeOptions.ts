// Константы для профиля пользователя
export const PHOTO_CONSTANTS = {
  FIELD_LIMITS: {
    login: 50,
    email: 50,
    description: 500,
    password: 50,
  },

  ALLOWED_AVATAR_TYPES: ['image/jpeg', 'image/jpg', 'image/png'] as const,

  MAX_FILE_SIZE: 5 * 1024 * 1024,

  ERROR_MESSAGES: {
    INVALID_FILE_TYPE: 'Пожалуйста, выберите файл с расширением .jpg, .jpeg или .png',
    FILE_TOO_LARGE: 'Размер файла не должен превышать 5MB',
    LOGIN_REQUIRED: 'Login обязателен',
    EMAIL_REQUIRED: 'Email обязателен',
    EMAIL_INVALID: 'Некорректный формат email',
    PASSWORD_REQUIRED: 'Пароль обязателен',
    PASSWORD_TOO_SHORT: 'Пароль должен содержать минимум 6 символов',
  },

  FILE_ACCEPT: '.jpg,.jpeg,.png',
} as const;

export type AllowedAvatarType = (typeof PHOTO_CONSTANTS.ALLOWED_AVATAR_TYPES)[number];
export type FieldLimitKey = keyof typeof PHOTO_CONSTANTS.FIELD_LIMITS;
