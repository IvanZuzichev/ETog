import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState } from 'react';
import './RegistrationContent.scss';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

interface RegistrationData {
    login: string,
    email: string,
    password: string,
    agreedToTerms: boolean
}

interface RegistrationDataProps {
  formData: RegistrationData;
  onFormChange: (field: string, value: string | boolean) => void;
  className?: string;
}

export const RegistrationContent: React.FC<RegistrationDataProps> = ({
    formData,
    onFormChange,
    className = ''
}) => {

    const [errors, setErrors] = useState<{email?: string; password?: string; agreedToTerms?: string; general?: string}>({});
  
  useThemeApply();

  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     onFormChange(field, e.target.value);
     if (errors[field as keyof typeof errors]) {
       setErrors(prev => ({...prev, [field]: undefined}));
     }
   };

  const handleCheckboxChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
     onFormChange(field, e.target.checked);
     if (errors[field as keyof typeof errors]) {
       setErrors(prev => ({...prev, [field]: undefined}));
     }
   };

  const validateForm = () => {
    const newErrors: {email?: string; password?: string; agreedToTerms?: string} = {};

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

    // Проверка согласия с условиями
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Необходимо принять пользовательское соглашение';
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

  const handleRegistrationSubmit = () => {
      navigate('/Authorization');
  };

  return (
    <div className='main-page-wrapper'>
        <form className={`registration-form-container ${className}`} onSubmit={handleSubmit}>
              <div className="form-field">
                <h1 className='form-h1'>Регистрация</h1>
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
                <label htmlFor="login" className="form-label">
                  Введите логин 
                </label>
                <input
                  id="login"
                  type="text"
                  value={formData.login}
                  onChange={handleInputChange('login')}
                  className="form-input"
                  placeholder="Логин"
                  required
                />
              </div>

              
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Введите пароль
            </label>
            <input
              id="password" 
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              className="form-input"
              placeholder="Пароль"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

              <div className="form-field agreement-field">
                <div className="agreement-container">
                  <input
                    id="agreement"
                    type="checkbox"
                    checked={formData.agreedToTerms || false}
                    onChange={handleCheckboxChange('agreedToTerms')}
                    className="agreement-checkbox"
                  />
                  <label htmlFor="agreement" className="agreement-label">
                    Согласен с <Link to="/LegalDocuments" className="agreement-link">пользовательским соглашением</Link>
                  </label>
                </div>
                {errors.agreedToTerms && <span className="error-message">{errors.agreedToTerms}</span>}
              </div>

              <div className="form-field">
                <button type="submit" className='button-registrations'>
                  Регистрация
                </button>
              </div>

                 <div className="form-field">
                <button type="button" className='button-registration' onClick={handleRegistrationSubmit}>
                  Уже есть аккаунт? Войдите
                </button>
              </div>
            </form>
        </div>
    );
};