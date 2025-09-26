import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useState } from 'react';
import {AccountContent } from '../../components/AccountContent/AccountContent';

const AccountPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Личный кабинет | Events Together — ETog');
  
      const [formData, setFormData] = useState({
             login: '',
             email: '',
             description: '',
             password: ''
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
      <AccountContent formData={formData} 
              onFormChange={handleFormChange} />
      <Footer/>
    </div>
  );
}

export default AccountPage;