import { useState, useEffect } from 'react';
import './EventTypeDropdown.scss';
import { EVENT_TYPE_OPTIONS } from '../../../store/constants/eventTypeOptions';
import type { EventType } from '../../../store/constants/eventTypeOptions';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface DropdownProps {
  onSelect: (value: EventType) => void;
  className?: string;
  selectedValue?: EventType | null; // Добавляем новый проп
}

export const EventTypeDropdown: React.FC<DropdownProps> = ({ 
  onSelect, 
  selectedValue: externalSelectedValue = null // Добавляем внешнее управление
}) => {
  useThemeApply();
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedValue, setInternalSelectedValue] = useState<EventType | null>(null);

  // Синхронизируем внутреннее состояние с внешним пропом
  useEffect(() => {
    if (externalSelectedValue !== undefined) {
      setInternalSelectedValue(externalSelectedValue);
    }
  }, [externalSelectedValue]);

  // Используем внешнее значение или внутреннее
  const selectedValue = externalSelectedValue !== undefined ? externalSelectedValue : internalSelectedValue;

  const handleSelect = (value: EventType) => {
    if (externalSelectedValue === undefined) {
      setInternalSelectedValue(value);
    }
    onSelect(value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown-container`}>
      <button type='button' onClick={handleToggle} className='dropdown-button'>
        <span>{selectedValue ? selectedValue : 'Тип мероприятия'}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className='dropdown-menu'>
          {EVENT_TYPE_OPTIONS.map(option => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`dropdown-item ${selectedValue === option ? 'dropdown-item-selected' : ''}`}
              role='menuitem'
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};