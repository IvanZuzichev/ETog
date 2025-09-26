import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import React, { useState } from 'react';
import './SupportContent.scss';
import { useNavigate } from 'react-router-dom'; 

interface ContactFormData {
    email: string,
    title: string,
    description: string,
}

interface SupportFormDataProps {
  formData: ContactFormData;
  onFormChange: (field: string, value: string | number) => void;
  className?: string;
}

export const SupportContent: React.FC<SupportFormDataProps> = ({
    formData,
    onFormChange,
    className = ''
}) => {

  const [errors, setErrors] = useState<{eventType?: string; eventDateTime?: string}>({});

  useThemeApply();
  useDocumentTitle('Поддержка | Events Together — ETog');

  const navigate = useNavigate();

  const handleContactClick = (): void => {
    navigate('/ContactUs');
  };

  const validateForm = () => {
    const newErrors: {eventType?: string; eventDateTime?: string} = {};
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     onFormChange(field, e.target.value);
     if (field === 'eventType' || field === 'eventDateTime') {
       setErrors(prev => ({...prev, [field]: undefined}));
     }
   };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        console.log('Форма отправлена', formData);
      }
    };

  return (
    <div className='main-page-wrapper'>
        <form className={`support-form-container ${className}`} onSubmit={handleSubmit}>
              <div className="form-field">
                <h1 className='form-h1'>Служба поддержки (вы можете написать о своей проблеме)</h1>
              </div>
              
        
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Электронная почта, куда придет ответ
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
                <label htmlFor="title" className="form-label">
                  Тема проблемы
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  className="form-input"
                  placeholder="Введите тему проблемы"
                  required
                />
              </div>
        
              <div className="form-field">
                <label htmlFor="description" className="form-label">
                  Содержимое проблемы
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  className="form-textarea"
                  placeholder="Введите содержимое проблемы"
                  rows={4}
                  required
                />
              </div>

              <div className="form-field">
                <button type="submit" className='button-supports'>Отправить проблему</button>
              </div>
               <div className="form-field">
                <button type="button" className='button-supports-help' onClick={handleContactClick}>Если появились пожелания</button>
              </div>
            </form>
        </div>
    );
};