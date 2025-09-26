import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState } from 'react';
import './AuthorizationContent.scss';
import { useNavigate } from 'react-router-dom'; 

interface AuthorizationData {
    email: string,
    password: string
}

interface AuthorizationDataProps {
  formData: AuthorizationData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

export const AuthorizationContent: React.FC<AuthorizationDataProps> = ({
    formData,
    onFormChange,
    className = ''
}) => {

    const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  
  useThemeApply();

  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     onFormChange(field, e.target.value);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Форма отправлена', formData);
      navigate('/MyAccount');
    }
  };

  
  const handleSendCodeSubmit = () => {
      navigate('/SendMessage');
  };

    const handleRegistrationSubmit = () => {
      navigate('/Registration');
  };

  return (
    <div className='main-page-wrapper'>
        <form className={`authorization-form-container ${className}`} onSubmit={handleSubmit}>
              <div className="form-field">
                <h1 className='form-h1'>Авторизация</h1>
              </div>
              
        
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Введите адрес электронной почты
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
              Введите пароль
            </label>
            <input
              id="password" // Исправлено: было repeat_password
              type="password" // Добавлено для безопасности
              value={formData.password}
              onChange={handleInputChange('password')}
              className="form-input"
              placeholder="Пароль"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
            <div className="form-field">
                <button type="button" className='button-authorization' onClick={handleSendCodeSubmit}>
                  Забыли пароль?
                </button>
              </div>

              <div className="form-field">
                <button type="submit" className='button-authorizations' onClick={handleSubmit}>
                  Авторизироваться
                </button>
              </div>

                 <div className="form-field">
                <button type="button" className='button-authorization' onClick={handleRegistrationSubmit}>
                  Регистрация
                </button>
              </div>
            </form>
        </div>
    );
};