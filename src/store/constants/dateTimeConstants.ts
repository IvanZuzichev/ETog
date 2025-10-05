// Константы для компонента календаря на странице создания мероприятия
export const DATE_TIME_CONSTANTS = {
  MONTHS: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ] as const,

  // Дни недели
  DAYS_OF_WEEK: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const,

  // Интервалы времени (в минутах)
  TIME_INTERVALS: {
    MINUTES: 30,
  },

  // Форматы
  FORMATS: {
    DATE_TIME: 'DD.MM.YYYY HH:mm',
    TIME: 'HH:mm',
    DATE: 'DD.MM.YYYY',
  },

  MESSAGES: {
    SELECT_DATE_TIME: 'Выберите дату и время',
    SELECTED_DATE: 'Выбрана дата:',
    SELECT_TIME: 'Выберите время',
    PLEASE_SELECT: 'Пожалуйста, выберите дату и время',
    SAVE: 'Сохранить',
  },

  CLASS_NAMES: {
    EMPTY: 'empty',
    SELECTED: 'selected',
    DISABLED: 'disabled',
    ACTIVE: 'active',
    OPEN: 'open',
  },
} as const;

export type MonthName = (typeof DATE_TIME_CONSTANTS.MONTHS)[number];
export type DayOfWeek = (typeof DATE_TIME_CONSTANTS.DAYS_OF_WEEK)[number];
