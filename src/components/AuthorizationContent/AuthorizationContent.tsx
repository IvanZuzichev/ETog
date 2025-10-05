import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState, useEffect } from 'react';
import './AuthorizationContent.scss';
import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION_CONSTANTS } from '../../store/constants/authorizationConstants';
import { useSecureStorage } from '../../hooks/useSecureStorage';
import { useDataProtection } from '../../hooks/useDataProtection';

interface AuthorizationData {
  email: string;
  password: string;
}

interface AuthorizationDataProps {
  formData: AuthorizationData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

// Компонент с авторизацией
export const AuthorizationContent: React.FC<AuthorizationDataProps> = ({ formData, onFormChange, className = '' }) => {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const { setSecureItem, getSecureItem } = useSecureStorage();
  const { hashData, generateSecureId } = useDataProtection();

  useThemeApply();
  const navigate = useNavigate();

  // Защита от брутфорса - проверяем попытки при загрузке
  useEffect(() => {
    const loginAttempts = getSecureItem('login_attempts');
    const lastAttemptTime = getSecureItem('last_attempt_time');

    if (loginAttempts && lastAttemptTime) {
      const attemptsCount = parseInt(loginAttempts);
      const lastTime = parseInt(lastAttemptTime);
      const now = Date.now();

      // Если прошло больше 15 минут - сбрасываем счетчик
      if (now - lastTime > 15 * 60 * 1000) {
        setSecureItem('login_attempts', '0');
        setAttempts(0);
      } else {
        setAttempts(attemptsCount);
      }
    }
  }, [getSecureItem, setSecureItem]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Проверяем длину вводимого текста
    const limit = AUTHORIZATION_CONSTANTS.FIELD_LIMITS[field as keyof typeof AUTHORIZATION_CONSTANTS.FIELD_LIMITS];
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
    const newErrors: { email?: string; password?: string } = {};

    // Проверка email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    } else if (formData.email.length > AUTHORIZATION_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${AUTHORIZATION_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    } else if (formData.password.length > AUTHORIZATION_CONSTANTS.FIELD_LIMITS.password) {
      newErrors.password = `Пароль не должен превышать ${AUTHORIZATION_CONSTANTS.FIELD_LIMITS.password} символов`;
    }

    // Проверка на слишком частые попытки
    if (attempts >= 5) {
      newErrors.email = 'Слишком много попыток. Попробуйте через 15 минут.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Безопасная обработка авторизации
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 🔒 ДЛЯ БУДУЩЕГО API - защищенные данные
      const hashedPassword = hashData(formData.password);
      const sessionId = generateSecureId();
      const normalizedEmail = formData.email.trim().toLowerCase();

      const secureDataForAPI = {
        email: normalizedEmail,
        passwordHash: hashedPassword, // В API будем передавать хеш
        sessionId,
        timestamp: Date.now(),
      };

      const authorizationDataMessage = `
      Вы ввели данные:
      Email: ${formData.email}
      Пароль: ${formData.password}
      
      Для API будут переданы защищенные данные:
      Email: ${secureDataForAPI.email}
      Хеш пароля: ${secureDataForAPI.passwordHash.substring(0, 16)}...
      Сессия: ${secureDataForAPI.sessionId.substring(0, 8)}...
      `.trim();

      // Показываем alert с понятными данными
      alert(authorizationDataMessage);

      // Логируем для отладки (в продакшене убрать)
      console.log('Данные для API:', secureDataForAPI);
      console.log('Оригинальные данные:', {
        email: formData.email,
        password: '***', // Пароль не логируем!
      });

      // Сохраняем сессию безопасно
      setSecureItem(
        'user_session',
        JSON.stringify({
          email: secureDataForAPI.email,
          sessionId: secureDataForAPI.sessionId,
          loginTime: Date.now(),
        })
      );

      // Сбрасываем счетчик попыток при успешной авторизации
      setSecureItem('login_attempts', '0');
      setAttempts(0);

      // Переход на страницу аккаунта
      navigate('/MyAccount');
    } catch (error) {
      // Увеличиваем счетчик неудачных попыток
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setSecureItem('login_attempts', newAttempts.toString());
      setSecureItem('last_attempt_time', Date.now().toString());

      console.error('Ошибка авторизации:', error);
      setErrors({
        email: 'Ошибка авторизации. Проверьте данные.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Переход в сектор сброса пароля
  const handleSendCodeSubmit = () => {
    navigate('/SendMessage');
  };

  // Переход в сектор регистрации
  const handleRegistrationSubmit = () => {
    navigate('/Registration');
  };

  return (
    <div className='main-page-wrapper'>
      <form className={`authorization-form-container ${className}`} onSubmit={handleSubmit}>
        <div className='form-field'>
          <h1 className='form-h1'>Авторизация</h1>
          {attempts >= 3 && (
            <div className='security-warning'>Несколько неудачных попыток. Осталось попыток: {5 - attempts}</div>
          )}
        </div>

        {/* Поле для электронной почты */}
        <div className='form-field'>
          <label htmlFor='email' className='form-label'>
            Введите адрес электронной почты
          </label>
          <input
            id='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange('email')}
            className='form-input'
            placeholder='email@example.com'
            required
            maxLength={AUTHORIZATION_CONSTANTS.FIELD_LIMITS.email}
            disabled={attempts >= 5 || isSubmitting}
          />
          <div className='character-count-right'>
            {formData.email.length}/{AUTHORIZATION_CONSTANTS.FIELD_LIMITS.email}
          </div>
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>

        {/* Поле для пароля */}
        <div className='form-field'>
          <label htmlFor='password' className='form-label'>
            Введите пароль
          </label>
          <input
            id='password'
            type='password'
            value={formData.password}
            onChange={handleInputChange('password')}
            className='form-input'
            placeholder='Пароль'
            required
            maxLength={AUTHORIZATION_CONSTANTS.FIELD_LIMITS.password}
            disabled={attempts >= 5 || isSubmitting}
          />
          <div className='character-count-right'>
            {formData.password.length}/{AUTHORIZATION_CONSTANTS.FIELD_LIMITS.password}
          </div>
          {errors.password && <span className='error-message'>{errors.password}</span>}
        </div>

        {/* Текст перехода в сектор сброса пароля */}
        <div className='form-field'>
          <button type='button' className='button-authorization' onClick={handleSendCodeSubmit} disabled={isSubmitting}>
            Забыли пароль?
          </button>
        </div>

        {/* Кнопка авторизации */}
        <div className='form-field'>
          <button type='submit' className='button-authorizations' disabled={attempts >= 5 || isSubmitting}>
            {isSubmitting ? 'Авторизация...' : 'Авторизироваться'}
          </button>
        </div>

        {/* Текст перехода в сектор регистрации */}
        <div className='form-field'>
          <button
            type='button'
            className='button-authorization'
            onClick={handleRegistrationSubmit}
            disabled={isSubmitting}
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
};
