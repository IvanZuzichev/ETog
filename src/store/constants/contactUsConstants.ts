// Константы для связи с нами
export const CONTACTUS_CONSTANTS = {
  // Ограничения по длине полей
  FIELD_LIMITS: {
    email: 50,
    title: 100,
    description: 500,
  } as const,
} as const;

export type SupportFieldLimitKey = keyof typeof CONTACTUS_CONSTANTS.FIELD_LIMITS;
