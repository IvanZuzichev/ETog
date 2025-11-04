import { useThemeApply } from '../../hooks/useThemeApply';
import { useState, useEffect } from 'react';
import './RegistrationContent.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { REGISTRATION_CONSTANTS } from '../../store/constants/registrationConstants';
import { useSecureStorage } from '../../hooks/useSecureStorage';
import { useDataProtection } from '../../hooks/useDataProtection';

interface RegistrationData {
  login: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

interface RegistrationDataProps {
  formData: RegistrationData;
  onFormChange: (field: string, value: string | boolean) => void;
  className?: string;
}

// Компонент для страницы регистрации
export const RegistrationContent: React.FC<RegistrationDataProps> = ({ formData, onFormChange, className = '' }) => {
  const [errors, setErrors] = useState<{ login?: string; email?: string; password?: string; agreedToTerms?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const { setSecureItem, getSecureItem } = useSecureStorage();
  const { generateSecureId, hashWithSalt, generateSalt } = useDataProtection();

  useThemeApply();
  const navigate = useNavigate();

  // Защита от спам-регистраций
  useEffect(() => {
    const registrationAttempts = getSecureItem('registration_attempts');
    const lastAttemptTime = getSecureItem('last_registration_time');

    if (registrationAttempts && lastAttemptTime) {
      const attemptsCount = parseInt(registrationAttempts);
      const lastTime = parseInt(lastAttemptTime);
      const now = Date.now();

      // Если прошло больше 30 минут - сбрасываем счетчик
      if (now - lastTime > 30 * 60 * 1000) {
        setSecureItem('registration_attempts', '0');
        setAttempts(0);
      } else {
        setAttempts(attemptsCount);
      }
    }
  }, [getSecureItem, setSecureItem]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Проверяем длину вводимого текста
    const limit = REGISTRATION_CONSTANTS.FIELD_LIMITS[field as keyof typeof REGISTRATION_CONSTANTS.FIELD_LIMITS];
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

  const handleCheckboxChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange(field, e.target.checked);
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Форма валидации
  const validateForm = () => {
    const newErrors: { login?: string; email?: string; password?: string; agreedToTerms?: string } = {};

    // Проверка на слишком частые попытки регистрации
    if (attempts >= 3) {
      newErrors.email = 'Слишком много попыток регистрации. Попробуйте через 30 минут.';
    }

    // Проверка логина
    if (!formData.login) {
      newErrors.login = 'Логин обязателен';
    } else if (formData.login.length < 3) {
      newErrors.login = 'Логин должен содержать минимум 3 символа';
    } else if (formData.login.length > REGISTRATION_CONSTANTS.FIELD_LIMITS.login) {
      newErrors.login = `Логин не должен превышать ${REGISTRATION_CONSTANTS.FIELD_LIMITS.login} символов`;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.login)) {
      newErrors.login = 'Логин может содержать только буквы, цифры и нижнее подчеркивание';
    }

    // Проверка email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    } else if (formData.email.length > REGISTRATION_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${REGISTRATION_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    } else if (formData.password.length > REGISTRATION_CONSTANTS.FIELD_LIMITS.password) {
      newErrors.password = `Пароль не должен превышать ${REGISTRATION_CONSTANTS.FIELD_LIMITS.password} символов`;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Пароль должен содержать заглавные и строчные буквы, а также цифры';
    }

    // Проверка согласия с условиями
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Необходимо принять пользовательское соглашение';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Метод функционала после нажатия на кнопку регистрации
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // ДЛЯ БУДУЩЕГО API - защищенные данные
      const salt = generateSalt();
      const hashedPassword = hashWithSalt(formData.password, salt);
      const userId = generateSecureId();
      const normalizedEmail = formData.email.trim().toLowerCase();
      const normalizedLogin = formData.login.trim();

      const secureDataForAPI = {
        userId,
        login: normalizedLogin,
        email: normalizedEmail,
        passwordHash: hashedPassword,
        salt: salt,
        agreedToTerms: formData.agreedToTerms,
        registrationTime: Date.now(),
        userAgent: navigator.userAgent,
      };

      // ДЛЯ ALERT - показываем оригинальные данные
      const registrationDataMessage = `
      Вы ввели данные:
      Логин: ${formData.login}
      Email: ${formData.email}
      Пароль: ${formData.password}
      Согласие с условиями: ${formData.agreedToTerms ? 'Да' : 'Нет'}
      
      Для API будут переданы защищенные данные:
      ID пользователя: ${secureDataForAPI.userId.substring(0, 8)}...
      Логин: ${secureDataForAPI.login}
      Email: ${secureDataForAPI.email}
      Хеш пароля: ${secureDataForAPI.passwordHash.substring(0, 16)}...
      Соль: ${secureDataForAPI.salt.substring(0, 8)}...
      `.trim();

      // Показываем alert с понятными данными
      alert(registrationDataMessage);

      // Логируем для отладки (в продакшене убрать)
      console.log('Данные регистрации для API:', {
        userId: secureDataForAPI.userId,
        login: secureDataForAPI.login,
        email: secureDataForAPI.email,
        passwordHash: secureDataForAPI.passwordHash.substring(0, 16) + '...',
        salt: secureDataForAPI.salt.substring(0, 8) + '...',
        registrationTime: secureDataForAPI.registrationTime,
      });

      // Сохраняем данные регистрации безопасно
      setSecureItem(
        'user_registration_data',
        JSON.stringify({
          userId: secureDataForAPI.userId,
          login: secureDataForAPI.login,
          email: secureDataForAPI.email,
          registrationTime: secureDataForAPI.registrationTime,
        })
      );

      // Сбрасываем счетчик попыток при успешной регистрации
      setSecureItem('registration_attempts', '0');
      setAttempts(0);

      // Переход на страницу аккаунта
      navigate('/MyAccount');
    } catch (error) {
      // Увеличиваем счетчик неудачных попыток
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setSecureItem('registration_attempts', newAttempts.toString());
      setSecureItem('last_registration_time', Date.now().toString());

      console.error('Ошибка регистрации:', error);
      setErrors({
        email: 'Ошибка регистрации. Попробуйте позже.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Переход на страницу авторизации
  const handleRegistrationSubmit = () => {
    navigate('/Authorization');
  };

  return (
    <div className='main-page-wrapper'>
      <form className={`registration-form-container ${className}`} onSubmit={handleSubmit}>
        <div className='form-field'>
          <h1 className='form-h1'>Регистрация</h1>
          {attempts >= 2 && (
            <div className='security-warning'>Несколько попыток регистрации. Осталось попыток: {3 - attempts}</div>
          )}
        </div>

        {/* Поле ввода электронной почты */}
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
            maxLength={REGISTRATION_CONSTANTS.FIELD_LIMITS.email}
            disabled={attempts >= 3 || isSubmitting}
          />
          <div className='character-count-right'>
            {formData.email.length}/{REGISTRATION_CONSTANTS.FIELD_LIMITS.email}
          </div>
          {errors.email && <span className='error-message'>{errors.email}</span>}
        </div>

        {/* Поле ввода логина */}
        <div className='form-field'>
          <label htmlFor='login' className='form-label'>
            Введите логин
          </label>
          <input
            id='login'
            type='text'
            value={formData.login}
            onChange={handleInputChange('login')}
            className='form-input'
            placeholder='Логин'
            required
            maxLength={REGISTRATION_CONSTANTS.FIELD_LIMITS.login}
            disabled={attempts >= 3 || isSubmitting}
          />
          <div className='character-count-right'>
            {formData.login.length}/{REGISTRATION_CONSTANTS.FIELD_LIMITS.login}
          </div>
          {errors.login && <span className='error-message'>{errors.login}</span>}
        </div>

        {/* Поле ввода пароля */}
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
            maxLength={REGISTRATION_CONSTANTS.FIELD_LIMITS.password}
            disabled={attempts >= 3 || isSubmitting}
          />
          <div className='character-count-right'>
            {formData.password.length}/{REGISTRATION_CONSTANTS.FIELD_LIMITS.password}
          </div>
          {errors.password && <span className='error-message'>{errors.password}</span>}
        </div>

        {/* Условие выбора согласия с пользовательским соглашением */}
        <div className='form-field agreement-field'>
          <div className='agreement-container'>
            <input
              id='agreement'
              type='checkbox'
              checked={formData.agreedToTerms || false}
              onChange={handleCheckboxChange('agreedToTerms')}
              className='agreement-checkbox'
              disabled={attempts >= 3 || isSubmitting}
            />
            <label htmlFor='agreement' className='agreement-label'>
              Согласен с{' '}
              <Link to='/UserAgreement' className='agreement-link'> 
                пользовательским соглашением
              </Link>
            </label>
          </div>
          {errors.agreedToTerms && <span className='error-message'>{errors.agreedToTerms}</span>}
        </div>

        {/* Кнопка регистрации */}
        <div className='form-field'>
          <button type='submit' className='button-registrations' disabled={attempts >= 3 || isSubmitting}>
            {isSubmitting ? 'Регистрация...' : 'Регистрация'}
          </button>
        </div>

        {/* Текст перехода на страницу авторизации */}
        <div className='form-field'>
          <button
            type='button'
            className='button-registration'
            onClick={handleRegistrationSubmit}
            disabled={isSubmitting}
          >
            Уже есть аккаунт? Войдите
          </button>
        </div>
      </form>
    </div>
  );
};
