import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import React, { useState } from 'react';
import { RegistrationContent } from '../../components/RegistrationContent/RegistrationContent';



interface RegistrationData {
  login: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

const RegistrationPage: React.FC = () => {
  useThemeApply();
    useDocumentTitle('Регистрация | Events Together — ETog');
    const [formData, setFormData] = useState({
           login: '',
           email: '',
           password: '',
           agreedToTerms: true
         });
       
         const handleFormChange = (field: string, value: string | boolean | Date) => {
           setFormData(prev => ({
             ...prev,
             [field]: value
           }));
           console.log('Field changed:', field, value);
         };
         
  return (
    <div className='main-page-wrapper'>
      <Header/>
      <RegistrationContent formData={formData} 
              onFormChange={handleFormChange} />
      <Footer/>
    </div>
  );
}

export default RegistrationPage;