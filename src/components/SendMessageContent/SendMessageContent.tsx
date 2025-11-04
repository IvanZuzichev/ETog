import { useThemeApply } from '../../hooks/useThemeApply';
import { useState } from 'react';
import './SendMessageContent.scss';
import { useNavigate } from 'react-router-dom';
import { SEND_MESSAGE_CONSTANTS } from '../../store/constants/sendMessageConstants';

interface SendMessageData {
  email: string;
}

interface SendMessageDataProps {
  formData: SendMessageData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

// Компонент для страницы отправки на почту кода сброса пароля и подтверждение личности
export const SendMessageContent: React.FC<SendMessageDataProps> = ({ formData, onFormChange, className = '' }) => {
  const [errors, setErrors] = useState<{ email?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  useThemeApply();

  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Проверяем длину вводимого текста
    const limit = SEND_MESSAGE_CONSTANTS.FIELD_LIMITS[field as keyof typeof SEND_MESSAGE_CONSTANTS.FIELD_LIMITS];
    if (limit && value.length > limit) {
      setErrors(prev => ({
        ...prev,
        [field]: `Максимальная длина: ${limit} символов`,
      }));
      return;
    }

    onFormChange(field, value);
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const newErrors: { email?: string } = {};

    // Проверка email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    } else if (formData.email.length > SEND_MESSAGE_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${SEND_MESSAGE_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBackSubmit = () => {
    navigate("/Authorization");
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const sendMessageData = `
      Вы ввели данные:
      Email: ${formData.email}
      `.trim();

      // Показываем alert с данными
      alert(sendMessageData);

      // Переход на страницу сброса пароля
      navigate('/ResetPassword');
    }
  };

  return (
    <div className='main-page-wrapper'>
      <form className={`sendmessage-form-container ${className}`} onSubmit={handleSubmit}>
        <div className='form-field'>
          <h1 className='form-h1'>Введите адрес электронной почты для отправки кода сброса пароля</h1>
        </div>
        {/* Ввод электронной почты */}
        <div className='form-field'>
          <label htmlFor='email' className='form-label'>
            Электронная почта, куда придет код
          </label>
          <input
            id='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange('email')}
            className='form-input'
            placeholder='email@example.com'
            required
            maxLength={SEND_MESSAGE_CONSTANTS.FIELD_LIMITS.email}
          />
          <div className='character-count-right'>
            {formData.email.length}/{SEND_MESSAGE_CONSTANTS.FIELD_LIMITS.email}
          </div>
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>
        {/* Кнопка вернуться */}
        <div className='form-field'>
          <button type='button' className='button-authorization' onClick={handleBackSubmit} disabled={isSubmitting}>
            Вспомнили пароль? Вернуться
          </button>
        </div>

        <div className='form-field'>
          <button type='submit' className='button-sendmessages'>
            Отправить код
          </button>
        </div>
      </form>
    </div>
  );
};
