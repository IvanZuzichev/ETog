import { useState, useRef, useEffect } from 'react';
import './DatePicker.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
import { DATE_TIME_CONSTANTS } from '../../../store/constants/dateTimeConstants';
import { DateTimeUtils } from '../../../utils/dateTimeUtils';

interface DatePickerProps {
  onSelect: (date: Date | null) => void;
  className?: string;
  selectedDate?: Date | null;
}

export const DatePicker: React.FC<DatePickerProps> = ({ 
  onSelect, 
  className = '',
  selectedDate: externalSelectedDate = null
}) => {
  useThemeApply();
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalSelectedDate !== undefined) {
      setInternalSelectedDate(externalSelectedDate);
    }
  }, [externalSelectedDate]);

  const selectedDate = externalSelectedDate !== undefined ? externalSelectedDate : internalSelectedDate;

  const isDayDisabled = (day: number): boolean => {
    const testDate = new Date(currentDate);
    testDate.setDate(day);
    testDate.setHours(0, 0, 0, 0);
    return DateTimeUtils.isPastDate(testDate);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (day: number) => {
    if (isDayDisabled(day)) return;

    const newDate = new Date(currentDate);
    newDate.setDate(day);
    newDate.setHours(0, 0, 0, 0);
    
    setTempDate(newDate);
    
    // Немедленно сохраняем выбранную дату (без времени)
    if (externalSelectedDate === undefined) {
      setInternalSelectedDate(newDate);
    }
    onSelect(newDate);
  };

  const handleClearDate = () => {
    setTempDate(null);
    if (externalSelectedDate === undefined) {
      setInternalSelectedDate(null);
    }
    onSelect(null);
    setIsOpen(false);
  };

  const navigateMonth = (direction: number) => {
    const newDate = DateTimeUtils.addMonths(currentDate, direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    return DateTimeUtils.getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  };

  return (
    <div className={`datepicker-container ${className}`} ref={calendarRef}>
      <button type='button' onClick={handleToggle} className='datepicker-button'>
        <span>{selectedDate ? DateTimeUtils.formatDateOnly(selectedDate) : 'Выберите дату'}</span>
        <span className={`datepicker-arrow ${isOpen ? DATE_TIME_CONSTANTS.CLASS_NAMES.OPEN : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className='datepicker-modal'>
          <div className='datepicker-content'>
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

            {/* Кнопки действий */}
            <div className='datepicker-actions'>
              {tempDate && (
                <button
                  className='clear-button'
                  onClick={handleClearDate}
                >
                  Очистить
                </button>
              )}
              <button
                className='close-button'
                onClick={() => setIsOpen(false)}
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};