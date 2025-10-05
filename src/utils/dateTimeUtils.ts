// Утилита для параметров дат
export const DateTimeUtils = {
  generateTimeSlots: (interval: number = 30): Array<{ hour: number; minute: number }> => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        slots.push({ hour, minute });
      }
    }
    return slots;
  },

  formatDate: (date: Date | null, defaultValue: string = 'Выберите дату и время'): string => {
    if (!date) return defaultValue;

    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  },

  formatDateOnly: (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  },

  formatTime: (hour: number, minute: number): string => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  },

  isPastDate: (date: Date): boolean => {
    const now = new Date();
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return dateWithoutTime < nowWithoutTime;
  },

  isPastDateTime: (date: Date, time: { hour: number; minute: number }): boolean => {
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(time.hour, time.minute, 0, 0);
    return selectedDateTime < new Date();
  },

  getDaysInMonth: (year: number, month: number): number[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: number[] = [];

    for (let i = 0; i < (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1); i++) {
      days.push(0);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }

    return days;
  },

  addMonths: (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  },
} as const;
