import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {ContactUsContent} from '../../components/ContactUsContent/ContactUsContent';
import { useState } from 'react';
const ContactUsPage: React.FC = () => {
  useThemeApply();
useDocumentTitle('Связаться с нами | Events Together — ETog');

  const [formData, setFormData] = useState({
    email: '',
    title: '',
    description: '',
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
      <ContactUsContent   formData={formData} 
        onFormChange={handleFormChange} />
      <Footer/>
    </div>
  );
}

export default ContactUsPage;