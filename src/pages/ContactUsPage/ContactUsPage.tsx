import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ContactUsContent } from '../../components/ContactUsContent/ContactUsContent';
import { useState } from 'react';

// Страница связаться с нами
const ContactUsPage: React.FC = () => {
  useDocumentTitle('Связаться с нами | Events Together — ETog');

  const [formData, setFormData] = useState({
    email: '',
    title: '',
    description: '',
  });

  const handleFormChange = (field: string, value: string | number | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <ContactUsContent formData={formData} onFormChange={handleFormChange} />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
