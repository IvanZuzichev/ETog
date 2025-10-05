// Константы для сброса пароля
export const RESET_PASSWORD_CONSTANTS = {
  // Ограничения по длине полей
  FIELD_LIMITS: {
    email: 50,
    code: 6,
    password: 50,
    repeat_password: 50,
  } as const,
} as const;

export type ResetPasswordFieldLimitKey = keyof typeof RESET_PASSWORD_CONSTANTS.FIELD_LIMITS;
