// Константы для регистрации
export const REGISTRATION_CONSTANTS = {
  // Ограничения по длине полей
  FIELD_LIMITS: {
    login: 50,
    email: 50,
    password: 50,
  } as const,
} as const;

export type FieldLimitKey = keyof typeof REGISTRATION_CONSTANTS.FIELD_LIMITS;
