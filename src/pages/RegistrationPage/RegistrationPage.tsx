import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import React, { useState } from 'react';
import { RegistrationContent } from '../../components/RegistrationContent/RegistrationContent';

// Страница регистрации
const RegistrationPage: React.FC = () => {
  useDocumentTitle('Регистрация | Events Together — ETog');
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    agreedToTerms: true,
  });

  const handleFormChange = (field: string, value: string | boolean | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className='main-page-wrapper'>
      <Header />
      <RegistrationContent formData={formData} onFormChange={handleFormChange} />
      <Footer />
    </div>
  );
};

export default RegistrationPage;
