import React, { useState } from 'react';
import './EventFormFields.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
import {EventTypeDropdown} from '../EventTypeDropdown/EventTypeDropdown';
import {DateTimePicker} from '../DateTimePicker/DateTimePicker';

interface EventFormData {
  title: string;
  description: string;
  price: string;
  address: string;
  phone: string;
  telegram: string;
  email: string;
  eventType?: string; 
  eventDateTime?: Date;
}

interface EventFormFieldsProps {
  formData: EventFormData;
  onFormChange: (field: string, value: string | number | Date) => void;
  className?: string;
}

export const EventFormFields: React.FC<EventFormFieldsProps> = ({
  formData,
  onFormChange,
  className = ''
}) => {
  useThemeApply();
  const [errors, setErrors] = useState<{eventType?: string; eventDateTime?: string}>({});
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFormChange(field, e.target.value);
    // Очищаем ошибку при изменении поля
    if (field === 'eventType' || field === 'eventDateTime') {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  const handleEventTypeSelect = (value: string) => {
    onFormChange('eventType', value);
    setErrors(prev => ({...prev, eventType: undefined}));
  };

  const handleDateTimeSelect = (value: Date) => {
    onFormChange('eventDateTime', value);
    setErrors(prev => ({...prev, eventDateTime: undefined}));
  };

  // Валидация перед отправкой
  const validateForm = () => {
    const newErrors: {eventType?: string; eventDateTime?: string} = {};
    
    if (!formData.eventType) {
      newErrors.eventType = 'Выберите тип мероприятия';
    }
    
    if (!formData.eventDateTime) {
      newErrors.eventDateTime = 'Выберите дату и время';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Отправка формы
      console.log('Форма отправлена', formData);
    }
  };

  return (
    <form className={`event-form-container ${className}`} onSubmit={handleSubmit}>
      <div className="form-field">
        <h1 className='form-h1'>Заполните информацию о предстоящем мероприятии</h1>
      </div>
      
      <div className="form-field">
        <label htmlFor="title" className="form-label">
          Название мероприятия
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange('title')}
          className="form-input"
          placeholder="Введите название мероприятия"
          required
        />
      </div>

      <div className="form-field">
        <label className="form-label">
          Тип мероприятия *
        </label>
        <EventTypeDropdown 
          onSelect={handleEventTypeSelect} 
          className="form-dropdown"
        />
        {errors.eventType && <span className="error-message">{errors.eventType}</span>}
      </div>

      <div className="form-field">
        <label className="form-label">
          Дата и время мероприятия *
        </label>
        <DateTimePicker 
          onSelect={handleDateTimeSelect}
          className="form-datetime"
        />
        {errors.eventDateTime && <span className="error-message">{errors.eventDateTime}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description" className="form-label">
          Описание мероприятия
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange('description')}
          className="form-textarea"
          placeholder="Опишите ваше мероприятие"
          rows={4}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="price" className="form-label">
          Стоимость мероприятия
        </label>
        <input
          id="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange('price')}
          className="form-input no-spinner"
          placeholder="0"
          min="0"
          step="any"
          onWheel={(e) => e.currentTarget.blur()} // Предотвращает изменение колесиком мыши
        />
      </div>

      <div className="form-field">
        <label htmlFor="address" className="form-label">
          Адрес проведения мероприятия
        </label>
        <input
          id="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange('address')}
          className="form-input"
          placeholder="Введите адрес"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="phone" className="form-label">
          Номер телефона организатора
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          className="form-input"
          placeholder="+7 (999) 999-99-99"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="telegram" className="form-label">
          Ник телеграмм организатора
        </label>
        <input
          id="telegram"
          type="text"
          value={formData.telegram}
          onChange={handleInputChange('telegram')}
          className="form-input"
          placeholder="@username"
        />
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Электронная почта организатора
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          className="form-input"
          placeholder="email@example.com"
          required
        />
      </div>

      <div className="form-field">
        <button type="button" className='button-events'>Загрузите обложку мероприятия...</button>
      </div>
      
      <div className="form-field">
        <button type="submit" className='button-events'>Создать мероприятие</button>
      </div>
    </form>
  );
};
