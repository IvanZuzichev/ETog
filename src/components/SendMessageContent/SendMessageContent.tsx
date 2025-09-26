import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState } from 'react';
import './SendMessageContent.scss';
import { useNavigate } from 'react-router-dom'; 

interface SendMessageData {
    email: string,
}

interface SendMessageDataProps {
  formData: SendMessageData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

export const SendMessageContent: React.FC<SendMessageDataProps> = ({
    formData,
    onFormChange,
    className = ''
}) => {

    const [errors, setErrors] = useState<{eventType?: string; eventDateTime?: string}>({});
  
  useThemeApply();

  const navigate = useNavigate();

  const handleResetPasswordClick = (): void => {
    navigate('/ResetPassword');
  };

 const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     onFormChange(field, e.target.value);
     if (field === 'eventType' || field === 'eventDateTime') {
       setErrors(prev => ({...prev, [field]: undefined}));
     }
   };

  const validateForm = () => {
    const newErrors: {eventType?: string; eventDateTime?: string} = {};
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        console.log('Форма отправлена', formData);
      }
    };

  return (
    <div className='main-page-wrapper'>
        <form className={`sendmessage-form-container ${className}`} onSubmit={handleSubmit}>
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
              </div>

              <div className="form-field">
                <button type="submit" className='button-sendmessages' onClick={handleResetPasswordClick}>Отправить код</button>
              </div>
            </form>
        </div>
    );
};