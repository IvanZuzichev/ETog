import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventFormFields.scss';
import { useThemeApply } from '../../../hooks/useThemeApply';
import { EventTypeDropdown } from '../EventTypeDropdown/EventTypeDropdown';
import { DateTimePicker } from '../DateTimePicker/DateTimePicker';
import { EVENT_FORM_CONSTANTS } from '../../../store/constants/eventsFormConstanrs';

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

interface UploadedFile {
  file: File;
  name: string;
  extension: string;
}

// Компонент отвечающий за форму создания мероприятия
export const EventFormFields: React.FC<EventFormFieldsProps> = ({ formData, onFormChange, className = '' }) => {
  useThemeApply();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [errors, setErrors] = useState<{
    eventType?: string;
    eventDateTime?: string;
    title?: string;
    description?: string;
    address?: string;
    price?: string;
    phone?: string;
    telegram?: string;
    email?: string;
  }>({});

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Проверяем длину вводимого текста
    const limit = EVENT_FORM_CONSTANTS.FIELD_LIMITS[field as keyof typeof EVENT_FORM_CONSTANTS.FIELD_LIMITS];
    if (limit && value.length > limit) {
      setErrors(prev => ({
        ...prev,
        [field]: `Максимальная длина: ${limit} символов`,
      }));
      return;
    }

    onFormChange(field, value);
    setErrors(prev => ({ ...prev, [field]: undefined }));

    if (field === 'eventType' || field === 'eventDateTime') {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEventTypeSelect = (value: string) => {
    onFormChange('eventType', value);
    setErrors(prev => ({ ...prev, eventType: undefined }));
  };

  const handleDateTimeSelect = (value: Date) => {
    onFormChange('eventDateTime', value);
    setErrors(prev => ({ ...prev, eventDateTime: undefined }));
  };

  // Функция для открытия проводника файлов
  const handleCoverUpload = () => {
    fileInputRef.current?.click();
  };

  // Функция для обработки выбора файла
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!EVENT_FORM_CONSTANTS.ALLOWED_FILE_TYPES.includes(file.type as any)) {
        alert('Пожалуйста, выберите файл с расширением .jpg, .jpeg или .png');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5MB');
        return;
      }

      const fileName = file.name;
      const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

      setUploadedFile({
        file,
        name: fileName,
        extension: fileExtension,
      });
    }
  };

  // Функция для удаления загруженного файла
  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Функция для очистки формы
  const clearForm = () => {
    const fields = [
      'title',
      'description',
      'price',
      'address',
      'phone',
      'telegram',
      'email',
      'eventType',
      'eventDateTime',
    ];
    fields.forEach(field => {
      if (field === 'eventDateTime') {
        onFormChange(field, undefined as any);
      } else {
        onFormChange(field, '');
      }
    });
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Валидация перед отправкой
  const validateForm = () => {
    const newErrors: {
      eventType?: string;
      eventDateTime?: string;
      title?: string;
      description?: string;
      address?: string;
      price?: string;
      phone?: string;
      telegram?: string;
      email?: string;
    } = {};

    if (!formData.eventType) {
      newErrors.eventType = 'Выберите тип мероприятия';
    }

    if (!formData.eventDateTime) {
      newErrors.eventDateTime = 'Выберите дату и время';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Введите название мероприятия';
    } else if (formData.title.length > EVENT_FORM_CONSTANTS.FIELD_LIMITS.title) {
      newErrors.title = `Название не должно превышать ${EVENT_FORM_CONSTANTS.FIELD_LIMITS.title} символов`;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Введите описание мероприятия';
    } else if (formData.description.length > EVENT_FORM_CONSTANTS.FIELD_LIMITS.description) {
      newErrors.description = `Описание не должно превышать ${EVENT_FORM_CONSTANTS.FIELD_LIMITS.description} символов`;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес мероприятия';
    } else if (formData.address.length > EVENT_FORM_CONSTANTS.FIELD_LIMITS.address) {
      newErrors.address = `Адрес не должен превышать ${EVENT_FORM_CONSTANTS.FIELD_LIMITS.address} символов`;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (formData.phone.length > EVENT_FORM_CONSTANTS.FIELD_LIMITS.phone) {
      newErrors.phone = `Телефон не должен превышать ${EVENT_FORM_CONSTANTS.FIELD_LIMITS.phone} символов`;
    }

    if (formData.telegram.length > EVENT_FORM_CONSTANTS.FIELD_LIMITS.telegram) {
      newErrors.telegram = `Telegram не должен превышать ${EVENT_FORM_CONSTANTS.FIELD_LIMITS.telegram} символов`;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    } else if (formData.email.length > EVENT_FORM_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${EVENT_FORM_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const eventDataMessage = `
          Вы выбрали:
          Название: ${formData.title}
          Тип мероприятия: ${formData.eventType}
          Дата и время: ${formData.eventDateTime ? formData.eventDateTime.toLocaleString('ru-RU') : 'Не указано'}
          Описание: ${formData.description}
          Стоимость: ${formData.price || 'Бесплатно'}
          Адрес: ${formData.address}
          Телефон: ${formData.phone}
          Telegram: ${formData.telegram || 'Не указан'}
          Email: ${formData.email}
          ${uploadedFile ? `Фото: ${uploadedFile.name}` : 'Фото: Не загружено'}
      `.trim();

      alert(eventDataMessage);
      clearForm();
      // Переход в профиль со своими мероприятиями
      navigate('/MyAccount');
    }
  };

  return (
    <form className={`event-form-container ${className}`} onSubmit={handleSubmit}>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept='.jpg,.jpeg,.png'
        style={{ display: 'none' }}
      />

      <div className='form-header'>
        <h1 className='form-title'>Создание нового мероприятия</h1>
        <p className='form-subtitle'>Заполните информацию о предстоящем мероприятии</p>
      </div>

      {/* Основная информация */}
      <div className='form-section'>
        <h3 className='section-title'>Основная информация</h3>
        
        <div className='form-grid'>
          {/* Левая колонка */}
          <div className='form-column'>
            {/* Название мероприятия */}
            <div className='form-field'>
              <label htmlFor='title' className='form-label'>
                Название мероприятия
              </label>
              <input
                id='title'
                type='text'
                value={formData.title}
                onChange={handleInputChange('title')}
                className='form-input'
                placeholder='Введите название мероприятия'
                required
                maxLength={EVENT_FORM_CONSTANTS.FIELD_LIMITS.title}
              />
              <div className='character-count'>
                {formData.title.length}/{EVENT_FORM_CONSTANTS.FIELD_LIMITS.title}
              </div>
              {errors.title && <span className='error-message'>{errors.title}</span>}
            </div>

            {/* Тип мероприятия */}
            <div className='form-field'>
              <label className='form-label'>
                Тип мероприятия
              </label>
              <EventTypeDropdown 
                onSelect={handleEventTypeSelect} 
                className='form-dropdown'
              />
              {errors.eventType && <span className='error-message'>{errors.eventType}</span>}
            </div>

            {/* Дата и время */}
            <div className='form-field'>
              <label className='form-label'>
                Дата и время мероприятия
              </label>
              <DateTimePicker 
                onSelect={handleDateTimeSelect} 
                className='form-datetime'
              />
              {errors.eventDateTime && <span className='error-message'>{errors.eventDateTime}</span>}
            </div>
          </div>

          {/* Правая колонка */}
          <div className='form-column'>
            {/* Описание */}
            <div className='form-field'>
              <label htmlFor='description' className='form-label'>
                Описание мероприятия
              </label>
              <textarea
                id='description'
                value={formData.description}
                onChange={handleInputChange('description')}
                className='form-textarea'
                placeholder='Опишите ваше мероприятие'
                rows={8}
                required
                maxLength={EVENT_FORM_CONSTANTS.FIELD_LIMITS.description}
              />
              <div className='character-count'>
                {formData.description.length}/{EVENT_FORM_CONSTANTS.FIELD_LIMITS.description}
              </div>
              {errors.description && <span className='error-message'>{errors.description}</span>}
            </div>
          </div>
        </div>

        {/* Стоимость и адрес - одинаковой ширины */}
        <div className='equal-fields'>
          <div className='form-field'>
            <label htmlFor='price' className='form-label'>
              Стоимость (₽)
            </label>
            <div className='price-input-wrapper'>
              <input
                id='price'
                type='number'
                value={formData.price}
                onChange={handleInputChange('price')}
                className='form-input no-spinner'
                placeholder='0'
                min='0'
                step='100'
                onWheel={e => e.currentTarget.blur()}
              />
              <span className='price-suffix'>₽</span>
            </div>
            {errors.price && <span className='error-message'>{errors.price}</span>}
          </div>

          <div className='form-field'>
            <label htmlFor='address' className='form-label'>
              Адрес проведения
            </label>
            <input
              id='address'
              type='text'
              value={formData.address}
              onChange={handleInputChange('address')}
              className='form-input'
              placeholder='Введите адрес'
              required
              maxLength={EVENT_FORM_CONSTANTS.FIELD_LIMITS.address}
            />
            <div className='character-count'>
              {formData.address.length}/{EVENT_FORM_CONSTANTS.FIELD_LIMITS.address}
            </div>
            {errors.address && <span className='error-message'>{errors.address}</span>}
          </div>
        </div>
      </div>

      {/* Контактная информация */}
      <div className='form-section'>
        <h3 className='section-title'>Контактная информация организатора</h3>
        
        <div className='contact-grid'>
          {/* Телефон */}
          <div className='form-field'>
            <label htmlFor='phone' className='form-label'>
              Номер телефона
            </label>
            <input
              id='phone'
              type='tel'
              value={formData.phone}
              onChange={handleInputChange('phone')}
              className='form-input'
              placeholder='+7 (999) 999-99-99'
              required
              maxLength={EVENT_FORM_CONSTANTS.FIELD_LIMITS.phone}
            />
            <div className='character-count'>
              {formData.phone.length}/{EVENT_FORM_CONSTANTS.FIELD_LIMITS.phone}
            </div>
            {errors.phone && <span className='error-message'>{errors.phone}</span>}
          </div>

          {/* Telegram */}
          <div className='form-field'>
            <label htmlFor='telegram' className='form-label'>
              Telegram
            </label>
            <input
              id='telegram'
              type='text'
              value={formData.telegram}
              onChange={handleInputChange('telegram')}
              className='form-input'
              placeholder='@username'
              maxLength={EVENT_FORM_CONSTANTS.FIELD_LIMITS.telegram}
            />
            <div className='character-count'>
              {formData.telegram.length}/{EVENT_FORM_CONSTANTS.FIELD_LIMITS.telegram}
            </div>
            {errors.telegram && <span className='error-message'>{errors.telegram}</span>}
          </div>

          {/* Email */}
          <div className='form-field'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange('email')}
              className='form-input'
              placeholder='email@example.com'
              required
              maxLength={EVENT_FORM_CONSTANTS.FIELD_LIMITS.email}
            />
            <div className='character-count'>
              {formData.email.length}/{EVENT_FORM_CONSTANTS.FIELD_LIMITS.email}
            </div>
            {errors.email && <span className='error-message'>{errors.email}</span>}
          </div>
        </div>
      </div>

      {/* Загрузка обложки */}
      <div className='form-section'>
  <h3 className='section-title'>Загрузка обложки</h3>
  
  <div className='form-field'>
    <div className='upload-area' onClick={handleCoverUpload}>
      {uploadedFile ? (
        <div className='uploaded-file-info'>
          <div className='file-preview'>
            <div className='file-details'>
              <span className='file-name'>{uploadedFile.name}</span>
              <span className='file-size'>
                {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>
          <button 
            type='button' 
            className='remove-file-btn'
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFile();
            }}
            title='Удалить файл'
            aria-label='Удалить файл'
          >
          </button>
        </div>
      ) : (
        <>
          <div className='upload-text'>
            <p className='upload-title'>Загрузите обложку мероприятия</p>
            <p className='upload-subtitle'>JPG, PNG • Максимум 5MB</p>
          </div>
          <button type='button' className='upload-btn'>
            Выбрать файл
          </button>
        </>
      )}
    </div>
  </div>
</div>

      {/* Кнопки действий */}
      <div className='form-actions'>
        <button 
          type='button' 
          className='btn-secondary'
          onClick={clearForm}
            title='Очистить форму'
        >
          Очистить форму
        </button>
        <button 
          type='submit' 
          className='btn-primary'
           title='Создать мероприятие'
        >
          Создать мероприятие
        </button>
      </div>
    </form>
  );
};