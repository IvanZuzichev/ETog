import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {AuthorizationContent } from '../../components/AuthorizationContent/AuthorizationContent'
import { useState } from 'react';
const AuthorizationPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Авторизация | Events Together — ETog');

         const [formData, setFormData] = useState({
           email: '',
           password: ''
         });
       
         const handleFormChange = (field: string, value: string | number | Date) => {
           setFormData(prev => ({
             ...prev,
             [field]: value
           }));
           console.log('Field changed:', field, value);
         };
  return (
    <div className='main-page-wrapper'>
      <Header/>
      <AuthorizationContent formData={formData} 
              onFormChange={handleFormChange} />
      <Footer/>
    </div>
  );
}

export default AuthorizationPage;