// Константы для формы создания мероприятия
export const EVENT_FORM_CONSTANTS = {
  FIELD_LIMITS: {
    title: 50,
    description: 500,
    address: 50,
    phone: 50,
    telegram: 50,
    email: 50,
  },
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
} as const;
