export const EVENT_TYPE_OPTIONS = ['День рождения', 'Свадьба', 'Мальчишник', 'Девичник', 'Вечеринка', 'Парные свидания', 'Всемирные праздники', 'Собрание любителей', 'Другое'] as const;

export type EventType = typeof EVENT_TYPE_OPTIONS[number]; 