import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState } from 'react';
import './ResetPasswordContent.scss';
import { useNavigate } from 'react-router-dom'; 

interface ResetPasswordData {
    email: string,
    password: string,
    repeat_password: string
}

interface ResetPasswordDataProps {
  formData: ResetPasswordData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

export const ResetPasswordContent: React.FC<ResetPasswordDataProps> = ({
    formData,
    onFormChange,
    className = ''
}) => {

    const [errors, setErrors] = useState<{email?: string; password?: string; repeat_password?: string; general?: string}>({});
  
  useThemeApply();

  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     onFormChange(field, e.target.value);
     // Очищаем ошибку при изменении поля
     if (errors[field as keyof typeof errors]) {
       setErrors(prev => ({...prev, [field]: undefined}));
     }
   };

  const validateForm = () => {
    const newErrors: {email?: string; password?: string; repeat_password?: string} = {};

    // Проверка email
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    // Проверка повторного пароля
    if (!formData.repeat_password) {
      newErrors.repeat_password = 'Повторите пароль';
    } else if (formData.password !== formData.repeat_password) {
      newErrors.repeat_password = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Если форма валидна, выполняем навигацию
      console.log('Форма отправлена', formData);
      navigate('/');
    }
  };

  return (
    <div className='main-page-wrapper'>
        <form className={`resetpassword-form-container ${className}`} onSubmit={handleSubmit}>
              <div className="form-field">
                <h1 className='form-h1'>Введите адрес электронной почты для отправки кода сброса пароля</h1>
              </div>
              
        
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Электронная почта, куда придет код
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
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Введите новый пароль
            </label>
            <input
              id="password" // Исправлено: было repeat_password
              type="password" // Добавлено для безопасности
              value={formData.password}
              onChange={handleInputChange('password')}
              className="form-input"
              placeholder="Новый пароль"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="repeat_password" className="form-label">
              Введите повторно новый пароль
            </label>
            <input
              id="repeat_password" // Исправлено: было password
              type="password" // Добавлено для безопасности
              value={formData.repeat_password}
              onChange={handleInputChange('repeat_password')}
              className="form-input"
              placeholder="Повторите новый пароль"
              required
            />
            {errors.repeat_password && <span className="error-message">{errors.repeat_password}</span>}
          </div>

              <div className="form-field">
                <button type="submit" className='button-resetpasswords'>
                  Отправить код
                </button>
              </div>
            </form>
        </div>
    );
};