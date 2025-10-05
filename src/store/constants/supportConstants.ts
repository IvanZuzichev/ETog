// Константы для поддержки
export const SUPPORT_CONSTANTS = {
  // Ограничения по длине полей
  FIELD_LIMITS: {
    email: 50,
    title: 100,
    description: 500,
  } as const,
} as const;

export type SupportFieldLimitKey = keyof typeof SUPPORT_CONSTANTS.FIELD_LIMITS;
