import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useState } from 'react';
import { SupportContent } from '../../components/SupportContent/SupportContent';

// Страница поддержки
const SupportPage: React.FC = () => {
  useDocumentTitle('Поддержка | Events Together — ETog');

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
    console.log('Field changed:', field, value);
  };
  return (
    <div className='main-page-wrapper'>
      <Header />
      <SupportContent formData={formData} onFormChange={handleFormChange} />
      <Footer />
    </div>
  );
};

export default SupportPage;
