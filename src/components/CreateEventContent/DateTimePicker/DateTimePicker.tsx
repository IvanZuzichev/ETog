import { useState, useRef, useEffect } from 'react';
import './DateTimePicker.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
import { DATE_TIME_CONSTANTS } from '../../../store/constants/dateTimeConstants';
import { DateTimeUtils } from '../../../utils/dateTimeUtils';

interface DateTimePickerProps {
  onSelect: (date: Date) => void;
  className?: string;
}
// Компонент отвечающий за календарь при создании мероприятия
export const DateTimePicker: React.FC<DateTimePickerProps> = ({ onSelect, className = '' }) => {
  useThemeApply();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempTime, setTempTime] = useState<{ hour: number; minute: number } | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // Функция для проверки, доступен ли день для выбора
  const isDayDisabled = (day: number): boolean => {
    const testDate = new Date(currentDate);
    testDate.setDate(day);
    testDate.setHours(0, 0, 0, 0);
    return DateTimeUtils.isPastDate(testDate);
  };

  // Функция для проверки, доступно ли время для выбора
  const isTimeDisabled = (hour: number, minute: number): boolean => {
    if (!tempDate) return false;
    return DateTimeUtils.isPastDateTime(tempDate, { hour, minute });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
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
    if (isDayDisabled(day)) return;

    const newDate = new Date(currentDate);
    newDate.setDate(day);
    newDate.setHours(0, 0, 0, 0);
    setTempDate(newDate);
    setTempTime(null);
  };

  const handleTimeSelect = (hours: number, minutes: number) => {
    if (!tempDate || isTimeDisabled(hours, minutes)) return;

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
    const newDate = DateTimeUtils.addMonths(currentDate, direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    return DateTimeUtils.getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  };

  const isSelectionComplete = tempDate && tempTime;

  return (
    <div className={`datetime-container ${className}`} ref={calendarRef}>
      <button type='button' onClick={handleToggle} className='datetime-button'>
        <span>{DateTimeUtils.formatDate(selectedDate)}</span>
        <span className={`datetime-arrow ${isOpen ? DATE_TIME_CONSTANTS.CLASS_NAMES.OPEN : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className='datetime-modal'>
          <div className='datetime-content'>
            {/* Календарь */}
            <div className='calendar-section'>
              <div className='calendar-header'>
                <button className='calendar-nav-button' onClick={() => navigateMonth(-1)}>
                  ‹
                </button>
                <span className='calendar-month'>
                  {DATE_TIME_CONSTANTS.MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button className='calendar-nav-button' onClick={() => navigateMonth(1)}>
                  ›
                </button>
              </div>

              <div className='calendar-grid'>
                {DATE_TIME_CONSTANTS.DAYS_OF_WEEK.map(day => (
                  <div key={day} className='calendar-day-header'>
                    {day}
                  </div>
                ))}

                {getDaysInMonth().map((day, index) => (
                  <button
                    key={index}
                    className={`calendar-day ${day === 0 ? DATE_TIME_CONSTANTS.CLASS_NAMES.EMPTY : ''} ${
                      day !== 0 &&
                      tempDate &&
                      day === tempDate.getDate() &&
                      currentDate.getMonth() === tempDate.getMonth() &&
                      currentDate.getFullYear() === tempDate.getFullYear()
                        ? DATE_TIME_CONSTANTS.CLASS_NAMES.SELECTED
                        : ''
                    } ${day !== 0 && isDayDisabled(day) ? DATE_TIME_CONSTANTS.CLASS_NAMES.DISABLED : ''}`}
                    onClick={() => day !== 0 && handleDateSelect(day)}
                    disabled={day === 0 || (day !== 0 && isDayDisabled(day))}
                  >
                    {day !== 0 ? day : ''}
                  </button>
                ))}
              </div>

              {tempDate && (
                <div className='selected-date-info'>
                  {DATE_TIME_CONSTANTS.MESSAGES.SELECTED_DATE} {DateTimeUtils.formatDateOnly(tempDate)}
                </div>
              )}
            </div>

            {/* Выбор времени */}
            <div className='time-section'>
              <h4>
                {DATE_TIME_CONSTANTS.MESSAGES.SELECT_TIME}
                {tempTime && `(${DateTimeUtils.formatTime(tempTime.hour, tempTime.minute)})`}
              </h4>
              <div className='time-grid'>
                {DateTimeUtils.generateTimeSlots().map((slot, index) => (
                  <button
                    key={index}
                    className={`time-slot ${
                      tempTime && tempTime.hour === slot.hour && tempTime.minute === slot.minute
                        ? DATE_TIME_CONSTANTS.CLASS_NAMES.SELECTED
                        : ''
                    } ${isTimeDisabled(slot.hour, slot.minute) ? DATE_TIME_CONSTANTS.CLASS_NAMES.DISABLED : ''}`}
                    onClick={() => handleTimeSelect(slot.hour, slot.minute)}
                    disabled={isTimeDisabled(slot.hour, slot.minute)}
                  >
                    {DateTimeUtils.formatTime(slot.hour, slot.minute)}
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопка сохранения */}
            <div className='datetime-actions'>
              <button
                className={`save-button ${isSelectionComplete ? DATE_TIME_CONSTANTS.CLASS_NAMES.ACTIVE : DATE_TIME_CONSTANTS.CLASS_NAMES.DISABLED}`}
                onClick={handleSaveSelection}
                disabled={!isSelectionComplete}
              >
                {DATE_TIME_CONSTANTS.MESSAGES.SAVE}
              </button>
            </div>

            {!isSelectionComplete && (
              <div className='selection-warning'>{DATE_TIME_CONSTANTS.MESSAGES.PLEASE_SELECT}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
