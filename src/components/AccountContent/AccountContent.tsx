import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState } from 'react';
import './AccountContent.scss';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

interface AccountContentData {
    login: string,
    email: string,
    description: string,
    password: string
}

interface AccountContentDataProps {
  formData: AccountContentData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

export const AccountContent: React.FC<AccountContentDataProps> = ({
    formData,
    onFormChange,
    className = ''
}) => {

    const [errors, setErrors] = useState<{login?: String; email?: string; password?: string; description?: string; general?: string}>({});
  
  useThemeApply();

  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     onFormChange(field, e.target.value);
     if (errors[field as keyof typeof errors]) {
       setErrors(prev => ({...prev, [field]: undefined}));
     }
   };

  const validateForm = () => {
    const newErrors: {login?: string; email?: string; password?: string; description?: string} = {};
         // Проверка login
    if (!formData.login) {
      newErrors.login = 'Login обязателен';
    }


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

  const handleRegistrationSubmit = () => {
      navigate('/Authorization');
  };

  return (
    <div className='main-page-wrapper'>
        <div className={`accountcontent-container ${className}`}>
          <div className="profile-header">
            <h1 className='profile-title'>Личные данные профиля</h1>
          </div>
          
          <div className="profile-content">
            {/* Левая часть с фото */}
            <div className="profile-left">
              <div className="profile-photo-container">
                <div className="profile-photo">
                  <img 
                    src="src\assets\Photo\image.png" 
                    alt="Profile" 
                    className="profile-image"
                  />
                </div>
                <div className="verification-badge">
                  <img 
                    src="src\assets\Verificate\CheckMark.png" 
                    alt="Verified" 
                    className="checkmark-icon"
                  />
                  <span className="verified-text">Подтвержден</span>
                </div>
              </div>
            </div>

            {/* Правая часть с формой */}
            <div className="profile-right">
              <form className="accountcontent-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="login" className="form-label">
                    Ваш логин 
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
                  <label htmlFor="email" className="form-label">
                    Ваш адрес электронной почты
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
                  <label htmlFor="description" className="form-label">
                    Опишите немного о себе
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    className="form-textarea"
                    placeholder="Описание профиля"
                    rows={4}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="password" className="form-label">
                    Ваш пароль
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

                <div className="form-field">
                  <button type="submit" className='button-accountcontents'>
                    Изменить данные
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};