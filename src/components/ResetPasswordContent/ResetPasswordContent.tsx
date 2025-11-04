import { useThemeApply } from '../../hooks/useThemeApply';
import { useState } from 'react';
import './ResetPasswordContent.scss';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD_CONSTANTS } from '../../store/constants/resetPasswordConstants';

interface ResetPasswordData {
  email: string;
  code: string;
  password: string;
  repeat_password: string;
}

interface ResetPasswordDataProps {
  formData: ResetPasswordData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

// Компонент для ввода новых данных и восстановдение доступа к аккаунту
export const ResetPasswordContent: React.FC<ResetPasswordDataProps> = ({ formData, onFormChange, className = '' }) => {
  const [errors, setErrors] = useState<{ email?: string; code?: string; password?: string; repeat_password?: string }>(
    {}
  );
      const [isSubmitting, setIsSubmitting] = useState(false);
  useThemeApply();

  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Для поля code разрешаем ввод только цифр
    if (field === 'code') {
      // Удаляем все нецифровые символы
      const numericValue = value.replace(/\D/g, '');

      // Проверяем длину
      if (numericValue.length > RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.code) {
        setErrors(prev => ({
          ...prev,
          [field]: `Код должен содержать ${RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.code} цифр`,
        }));
        return;
      }

      onFormChange(field, numericValue);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return;
    }

    // Проверка длины
    const limit = RESET_PASSWORD_CONSTANTS.FIELD_LIMITS[field as keyof typeof RESET_PASSWORD_CONSTANTS.FIELD_LIMITS];
    if (limit && value.length > limit) {
      setErrors(prev => ({
        ...prev,
        [field]: `Максимальная длина: ${limit} символов`,
      }));
      return;
    }

    onFormChange(field, value);
    // Очищаем ошибку при изменении поля
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; code?: string; password?: string; repeat_password?: string } = {};

    // Проверка email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    } else if (formData.email.length > RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    // Проверка кода
    if (!formData.code) {
      newErrors.code = 'Код обязателен';
    } else if (formData.code.length !== RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.code) {
      newErrors.code = `Код должен содержать ${RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.code} цифр`;
    } else if (!/^\d+$/.test(formData.code)) {
      newErrors.code = 'Код должен содержать только цифры';
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    } else if (formData.password.length > RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.password) {
      newErrors.password = `Пароль не должен превышать ${RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.password} символов`;
    }

    // Проверка повторного пароля
    if (!formData.repeat_password) {
      newErrors.repeat_password = 'Повторите пароль';
    } else if (formData.password !== formData.repeat_password) {
      newErrors.repeat_password = 'Пароли не совпадают';
    } else if (formData.repeat_password.length > RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.repeat_password) {
      newErrors.repeat_password = `Пароль не должен превышать ${RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.repeat_password} символов`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Формируем сообщение со всеми данными
      const resetPasswordData = `
      Вы ввели данные:
      Email: ${formData.email}
      Код: ${formData.code}
      Новый пароль: ${formData.password}
      `.trim();

      alert(resetPasswordData);
      // Переход на главную страницу
      navigate('/');
    }
  };

  const handleBackSubmit = () => {
    navigate("/Authorization");
  }

  return (
    <div className='main-page-wrapper'>
      <form className={`resetpassword-form-container ${className}`} onSubmit={handleSubmit}>
        <div className='form-field'>
          <h1 className='form-h1'>Сброс пароля</h1>
        </div>
        {/* Поле ввода электронной почты */}
        <div className='form-field'>
          <label htmlFor='email' className='form-label'>
            Электронная почта
          </label>
          <input
            id='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange('email')}
            className='form-input'
            placeholder='email@example.com'
            required
            maxLength={RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.email}
          />
          <div className='character-count-right'>
            {formData.email.length}/{RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.email}
          </div>
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>
        {/* Поле ввода кода подтверждения личности */}
        <div className='form-field'>
          <label htmlFor='code' className='form-label'>
            Код подтверждения (6 цифр)
          </label>
          <input
            id='code'
            type='text'
            value={formData.code || ''}
            onChange={handleInputChange('code')}
            className='form-input'
            placeholder='123456'
            required
            maxLength={RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.code}
            inputMode='numeric'
            pattern='[0-9]*'
          />
          <div className='character-count-right'>
            {formData.code?.length || 0}/{RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.code}
          </div>
          {errors.code && <span className='error-message'>{errors.code}</span>}
        </div>
        {/* Поле ввода нового пароля */}
        <div className='form-field'>
          <label htmlFor='password' className='form-label'>
            Введите новый пароль
          </label>
          <input
            id='password'
            type='password'
            value={formData.password}
            onChange={handleInputChange('password')}
            className='form-input'
            placeholder='Новый пароль'
            required
            maxLength={RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.password}
          />
          <div className='character-count-right'>
            {formData.password.length}/{RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.password}
          </div>
          {errors.password && <span className='error-message'>{errors.password}</span>}
        </div>
        {/* Поле ввода повторого нового пароля (Если они не совпадают, то смена пароля не происходит). Проверяется на фронтенде */}
        <div className='form-field'>
          <label htmlFor='repeat_password' className='form-label'>
            Введите повторно новый пароль
          </label>
          <input
            id='repeat_password'
            type='password'
            value={formData.repeat_password}
            onChange={handleInputChange('repeat_password')}
            className='form-input'
            placeholder='Повторите новый пароль'
            required
            maxLength={RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.repeat_password}
          />
          <div className='character-count-right'>
            {formData.repeat_password.length}/{RESET_PASSWORD_CONSTANTS.FIELD_LIMITS.repeat_password}
          </div>
          {errors.repeat_password && <span className='error-message'>{errors.repeat_password}</span>}
        </div>
           {/* Кнопка вернуться */}
        <div className='form-field'>
          <button type='button' className='button-authorization' onClick={handleBackSubmit} disabled={isSubmitting}>
            Вспомнили пароль? Вернуться
          </button>
        </div>
        {/* Кнопка сброса пароля */}
        <div className='form-field'>
          <button type='submit' className='button-resetpasswords'>
            Сбросить пароль
          </button>
        </div>
      </form>
    </div>
  );
};
