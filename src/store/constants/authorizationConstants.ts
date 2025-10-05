// Константы для авторизации
export const AUTHORIZATION_CONSTANTS = {
  // Ограничения по длине полей
  FIELD_LIMITS: {
    email: 50,
    password: 50,
  } as const,
} as const;

export type FieldLimitKey = keyof typeof AUTHORIZATION_CONSTANTS.FIELD_LIMITS;
