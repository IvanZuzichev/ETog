import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useState } from 'react';
import './ContactUsContent.scss';
import { useNavigate } from 'react-router-dom';
import { CONTACTUS_CONSTANTS } from '../../store/constants/contactUsConstants';
import { useBlacklist } from '../../hooks/useBlackList';

interface ContactFormData {
  email: string;
  title: string;
  description: string;
}

interface ContactFormDataProps {
  formData: ContactFormData;
  onFormChange: (field: string, value: string | number) => void;
  className?: string;
}

// Компонент отвечающий за страницу "Связаться с нами"
export const ContactUsContent: React.FC<ContactFormDataProps> = ({ formData, onFormChange, className = '' }) => {
  const [errors, setErrors] = useState<{ email?: string; title?: string; description?: string }>({});
  const { validateInput } = useBlacklist();

  useThemeApply();
  useDocumentTitle('Связаться с нами | Events Together — ETog');

  const navigate = useNavigate();

  // Переход на страницу поддержки
  const handleSupportClick = (): void => {
    navigate('/Support');
  };

  const validateForm = () => {
    const newErrors: { email?: string; title?: string; description?: string } = {};

    // Проверка email
    if (formData.email.length > CONTACTUS_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${CONTACTUS_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    // Проверка темы на наличие запрещенных слов
    const titleValidation = validateInput(formData.title);
    if (titleValidation.containsBlacklistedWords) {
      newErrors.title = 'Тема содержит запрещенные слова';
    } else if (formData.title.length > CONTACTUS_CONSTANTS.FIELD_LIMITS.title) {
      newErrors.title = `Тема не должна превышать ${CONTACTUS_CONSTANTS.FIELD_LIMITS.title} символов`;
    }

    // Проверка описания на наличие запрещенных слов
    const descriptionValidation = validateInput(formData.description);
    if (descriptionValidation.containsBlacklistedWords) {
      newErrors.description = 'Содержимое письма содержит запрещенные слова';
    } else if (formData.description.length > CONTACTUS_CONSTANTS.FIELD_LIMITS.description) {
      newErrors.description = `Содержимое не должно превышать ${CONTACTUS_CONSTANTS.FIELD_LIMITS.description} символов`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Проверяем длину вводимого текста
    const limit = CONTACTUS_CONSTANTS.FIELD_LIMITS[field as keyof typeof CONTACTUS_CONSTANTS.FIELD_LIMITS];
    if (limit && value.length > limit) {
      setErrors(prev => ({
        ...prev,
        [field]: `Максимальная длина: ${limit} символов`,
      }));
      return;
    }

    // Проверяем поля "тема" и "содержимое" на наличие запрещенных слов
    if (field === 'title' || field === 'description') {
      const blacklistValidation = validateInput(value);
      if (blacklistValidation.containsBlacklistedWords) {
        setErrors(prev => ({
          ...prev,
          [field]:
            field === 'title' ? 'Тема содержит запрещенные слова' : 'Содержимое письма содержит запрещенные слова',
        }));
        return; // Важно: не обновляем поле!
      }
    }

    // Если проверки пройдены, обновляем значение и очищаем ошибку
    onFormChange(field, value);
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Функция для очистки формы
  const clearForm = () => {
    const fields = ['email', 'title', 'description'];
    fields.forEach(field => {
      onFormChange(field, '');
    });
  };

  // Метод отправки письма пожелания
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ВАЖНО: сначала валидируем форму и получаем результат
    const isValid = validateForm();

    if (!isValid) {
      // Если форма не валидна, показываем соответствующие сообщения
      if (errors.title?.includes('запрещенные слова') || errors.description?.includes('запрещенные слова')) {
        alert('Пожалуйста, удалите запрещенные слова из формы');
      }
      return; // Прерываем выполнение если есть ошибки
    }

    // Только если форма валидна, продолжаем отправку
    const contactDataMessage = `
      Вы ввели:
      Электронная почта: ${formData.email}
      Тема пожелания: ${formData.title}
      Содержимое пожелания: ${formData.description}
    `.trim();

    alert(contactDataMessage);

    // Очищаем форму
    clearForm();
  };

  // Проверяем наличие ошибок с запрещенными словами для блокировки кнопки
  const hasBlacklistErrors =
    validateInput(formData.title).containsBlacklistedWords ||
    validateInput(formData.description).containsBlacklistedWords;

  return (
    <div className='main-page-wrapper'>
      <form className={`contact-form-container ${className}`} onSubmit={handleSubmit}>
        <div className='form-field'>
          <h1 className='form-h1'>Свяжитесь с нами (вы можете написать свои пожелания нам)</h1>
        </div>
        {/* Ввод электронной почты */}
        <div className='form-field'>
          <label htmlFor='email' className='form-label'>
            Электронная почта, куда придет ответ
          </label>
          <input
            id='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange('email')}
            className='form-input'
            placeholder='email@example.com'
            required
            maxLength={CONTACTUS_CONSTANTS.FIELD_LIMITS.email}
          />
          <div className='character-count-right'>
            {formData.email.length}/{CONTACTUS_CONSTANTS.FIELD_LIMITS.email}
          </div>
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>
        {/* Ввод темы пожелания */}
        <div className='form-field'>
          <label htmlFor='title' className='form-label'>
            Тема пожелания
          </label>
          <input
            id='title'
            type='text'
            value={formData.title}
            onChange={handleInputChange('title')}
            className={`form-input ${errors.title ? 'has-error' : ''}`}
            placeholder='Введите тему пожелания'
            required
            maxLength={CONTACTUS_CONSTANTS.FIELD_LIMITS.title}
          />
          <div className='character-count-right'>
            {formData.title.length}/{CONTACTUS_CONSTANTS.FIELD_LIMITS.title}
          </div>
          {errors.title && <span className='error-message'>{errors.title}</span>}
        </div>
        {/* Ввод содержимого пожелания */}
        <div className='form-field'>
          <label htmlFor='description' className='form-label'>
            Содержимое пожелания
          </label>
          <textarea
            id='description'
            value={formData.description}
            onChange={handleInputChange('description')}
            className={`form-textarea ${errors.description ? 'has-error' : ''}`}
            placeholder='Введите содержимое пожелания'
            rows={4}
            required
            maxLength={CONTACTUS_CONSTANTS.FIELD_LIMITS.description}
          />
          <div className='character-count-right'>
            {formData.description.length}/{CONTACTUS_CONSTANTS.FIELD_LIMITS.description}
          </div>
          {errors.description && <span className='error-message'>{errors.description}</span>}
        </div>
        {/* Кнопка отправки пожелания */}
        <div className='form-field'>
          <button
            type='submit'
            className={`button-contacts ${hasBlacklistErrors ? 'button-contacts--disabled' : ''}`}
            disabled={hasBlacklistErrors}
          >
            Отправить пожелание
          </button>
        </div>
        {/* Текст перехода на старницу поддержки */}
        <div className='form-field'>
          <button type='button' className='button-contacts-help' onClick={handleSupportClick}>
            Если понадобилась поддержка
          </button>
        </div>
      </form>
    </div>
  );
};
