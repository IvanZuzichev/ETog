import { useState } from 'react';
import './EventTypeDropdown.scss';
import { EVENT_TYPE_OPTIONS } from '../../../store/constants/eventTypeOptions';
import type { EventType } from '../../../store/constants/eventTypeOptions';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface DropdownProps {
  onSelect: (value: EventType) => void;
  className?: string;
}

// Компонент отвечающий за выпадающий список выбора типа мероприятия
export const EventTypeDropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  useThemeApply();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<EventType | null>(null);

  const handleSelect = (value: EventType) => {
    setSelectedValue(value);
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
