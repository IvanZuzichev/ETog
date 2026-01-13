import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useState } from 'react';
import './SupportContent.scss';
import { useNavigate } from 'react-router-dom';
import { SUPPORT_CONSTANTS } from '../../store/constants/supportConstants';
import { useBlacklist } from '../../hooks/useBlackList';

interface ContactFormData {
  email: string;
  title: string;
  description: string;
}

interface SupportFormDataProps {
  formData: ContactFormData;
  onFormChange: (field: string, value: string | number) => void;
  className?: string;
}

// Компонент отвечающий за страницу поддержку
export const SupportContent: React.FC<SupportFormDataProps> = ({ formData, onFormChange, className = '' }) => {
  const [errors, setErrors] = useState<{ email?: string; title?: string; description?: string }>({});
  const { validateInput } = useBlacklist();

  useThemeApply();
  useDocumentTitle('Поддержка | Events Together — ETog');

  const validateForm = () => {
    const newErrors: { email?: string; title?: string; description?: string } = {};

    // Проверка email
    if (formData.email.length > SUPPORT_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${SUPPORT_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    // Проверка темы на наличие запрещенных слов
    const titleValidation = validateInput(formData.title);
    if (titleValidation.containsBlacklistedWords) {
      newErrors.title = 'Тема содержит запрещенные слова';
    } else if (formData.title.length > SUPPORT_CONSTANTS.FIELD_LIMITS.title) {
      newErrors.title = `Тема не должна превышать ${SUPPORT_CONSTANTS.FIELD_LIMITS.title} символов`;
    }

    // Проверка описания на наличие запрещенных слов
    const descriptionValidation = validateInput(formData.description);
    if (descriptionValidation.containsBlacklistedWords) {
      newErrors.description = 'Содержимое письма содержит запрещенные слова';
    } else if (formData.description.length > SUPPORT_CONSTANTS.FIELD_LIMITS.description) {
      newErrors.description = `Содержимое не должно превышать ${SUPPORT_CONSTANTS.FIELD_LIMITS.description} символов`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Проверяем длину вводимого текста
    const limit = SUPPORT_CONSTANTS.FIELD_LIMITS[field as keyof typeof SUPPORT_CONSTANTS.FIELD_LIMITS];
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
        return; // Не обновляем поле, если есть маты
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
      Тема проблемы: ${formData.title}
      Содержимое проблемы: ${formData.description}
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
      <form className={`support-form-container ${className}`} onSubmit={handleSubmit}>
        <div className='form-field'>
          <h1 className='form-h1'>Служба поддержки (вы можете написать о своей проблеме)</h1>
        </div>

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
            maxLength={SUPPORT_CONSTANTS.FIELD_LIMITS.email}
          />
          <div className='character-count-right'>
            {formData.email.length}/{SUPPORT_CONSTANTS.FIELD_LIMITS.email}
          </div>
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>

        <div className='form-field'>
          <label htmlFor='title' className='form-label'>
            Тема проблемы
          </label>
          <input
            id='title'
            type='text'
            value={formData.title}
            onChange={handleInputChange('title')}
            className={`form-input ${errors.title ? 'has-error' : ''}`}
            placeholder='Введите тему проблемы'
            required
            maxLength={SUPPORT_CONSTANTS.FIELD_LIMITS.title}
          />
          <div className='character-count-right'>
            {formData.title.length}/{SUPPORT_CONSTANTS.FIELD_LIMITS.title}
          </div>
          {errors.title && <span className='error-message'>{errors.title}</span>}
        </div>

        <div className='form-field'>
          <label htmlFor='description' className='form-label'>
            Содержимое проблемы
          </label>
          <textarea
            id='description'
            value={formData.description}
            onChange={handleInputChange('description')}
            className={`form-textarea ${errors.description ? 'has-error' : ''}`}
            placeholder='Введите содержимое проблемы'
            rows={4}
            required
            maxLength={SUPPORT_CONSTANTS.FIELD_LIMITS.description}
          />
          <div className='character-count-right'>
            {formData.description.length}/{SUPPORT_CONSTANTS.FIELD_LIMITS.description}
          </div>
          {errors.description && <span className='error-message'>{errors.description}</span>}
        </div>

        <div className='form-field'>
          <button
            type='submit'
            className={`button-supports ${hasBlacklistErrors ? 'button-supports--disabled' : ''}`}
            disabled={hasBlacklistErrors}
          >
            Отправить проблему
          </button>
        </div>
      </form>
    </div>
  );
};
