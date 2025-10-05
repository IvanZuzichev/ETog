// Константы для отправки сообщения
export const SEND_MESSAGE_CONSTANTS = {
  // Ограничения по длине полей
  FIELD_LIMITS: {
    email: 50,
    code: 6,
  } as const,
} as const;

export type SendMessageFieldLimitKey = keyof typeof SEND_MESSAGE_CONSTANTS.FIELD_LIMITS;
