import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {ResetPasswordContent} from '../../components/ResetPasswordContent/ResetPasswordContent';
import { useState } from 'react';
const ResetPasswordPage: React.FC = () => {
  useThemeApply();
    useDocumentTitle('Смена пароля | Events Together — ETog');

    
         const [formData, setFormData] = useState({
           email: '',
           password: '',
           repeat_password: ''
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
      <ResetPasswordContent formData={formData} 
              onFormChange={handleFormChange} />
      <Footer/>
    </div>
  );
}

export default ResetPasswordPage;