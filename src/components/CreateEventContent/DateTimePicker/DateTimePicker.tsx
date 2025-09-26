import React, { useState, useRef, useEffect } from 'react';
import './DateTimePicker.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface DateTimePickerProps {
  onSelect: (date: Date) => void;
  className?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ onSelect, className = '' }) => {
  useThemeApply();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempTime, setTempTime] = useState<{ hour: number; minute: number } | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        // Не закрываем окно, если выбор не завершен
        if (!tempDate || !tempTime) {
          return;
        }
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tempDate, tempTime]);

  const handleToggle = () => {
    if (isOpen && tempDate && tempTime) {
      // Сохраняем выбранные значения при закрытии
      const finalDate = new Date(tempDate);
      finalDate.setHours(tempTime.hour, tempTime.minute);
      setSelectedDate(finalDate);
      onSelect(finalDate);
      setTempDate(null);
      setTempTime(null);
    }
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    newDate.setHours(0, 0, 0, 0); // Сбрасываем время
    setTempDate(newDate);
  };

  const handleTimeSelect = (hours: number, minutes: number) => {
    setTempTime({ hour: hours, minute: minutes });
  };

  const handleSaveSelection = () => {
    if (tempDate && tempTime) {
      const finalDate = new Date(tempDate);
      finalDate.setHours(tempTime.hour, tempTime.minute);
      setSelectedDate(finalDate);
      onSelect(finalDate);
      setIsOpen(false);
      setTempDate(null);
      setTempTime(null);
    }
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Выберите дату и время';
    
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push({ hour, minute });
      }
    }
    return slots;
  };

  const isSelectionComplete = tempDate && tempTime;

  return (
    <div className={`datetime-container ${className}`} ref={calendarRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="datetime-button"
      >
        <span>{formatDate(selectedDate)}</span>
        <span className={`datetime-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="datetime-modal">
          <div className="datetime-content">
            {/* Календарь */}
            <div className="calendar-section">
              <div className="calendar-header">
                <button 
                  className="calendar-nav-button"
                  onClick={() => navigateMonth(-1)}
                >
                  ‹
                </button>
                <span className="calendar-month">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button 
                  className="calendar-nav-button"
                  onClick={() => navigateMonth(1)}
                >
                  ›
                </button>
              </div>

              <div className="calendar-grid">
                {daysOfWeek.map(day => (
                  <div key={day} className="calendar-day-header">
                    {day}
                  </div>
                ))}
                
                {getDaysInMonth().map((day, index) => (
                  <button
                    key={index}
                    className={`calendar-day ${day === 0 ? 'empty' : ''} ${
                      day !== 0 && tempDate && 
                      day === tempDate.getDate() && 
                      currentDate.getMonth() === tempDate.getMonth() && 
                      currentDate.getFullYear() === tempDate.getFullYear()
                        ? 'selected' : ''
                    }`}
                    onClick={() => day !== 0 && handleDateSelect(day)}
                    disabled={day === 0}
                  >
                    {day !== 0 ? day : ''}
                  </button>
                ))}
              </div>

              {tempDate && (
                <div className="selected-date-info">
                  Выбрана дата: {tempDate.getDate().toString().padStart(2, '0')}.{(tempDate.getMonth() + 1).toString().padStart(2, '0')}.{tempDate.getFullYear()}
                </div>
              )}
            </div>

            {/* Выбор времени */}
            <div className="time-section">
              <h4>Выберите время {tempTime && `(${tempTime.hour.toString().padStart(2, '0')}:${tempTime.minute.toString().padStart(2, '0')})`}</h4>
              <div className="time-grid">
                {generateTimeSlots().map((slot, index) => (
                  <button
                    key={index}
                    className={`time-slot ${
                      tempTime && 
                      tempTime.hour === slot.hour && 
                      tempTime.minute === slot.minute 
                        ? 'selected' : ''
                    }`}
                    onClick={() => handleTimeSelect(slot.hour, slot.minute)}
                  >
                    {slot.hour.toString().padStart(2, '0')}:{slot.minute.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопка сохранения */}
            <div className="datetime-actions">
              <button
                className={`save-button ${isSelectionComplete ? 'active' : 'disabled'}`}
                onClick={handleSaveSelection}
                disabled={!isSelectionComplete}
              >
                Сохранить
              </button>
            </div>

            {!isSelectionComplete && (
              <div className="selection-warning">
                Пожалуйста, выберите дату и время
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
