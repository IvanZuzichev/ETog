import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { SendMessageContent } from '../../components/SendMessageContent/SendMessageContent';
import { useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Страница сброса пароля. Отправка кода на почту
const SendMessagePage: React.FC = () => {
  useDocumentTitle('Отправить код сброса пароля | Events Together — ETog');

  const [formData, setFormData] = useState({
    email: '',
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
      <div className="header-spacer"></div>
      <SendMessageContent formData={formData} onFormChange={handleFormChange} />
      {/* <Footer /> */}
    </div>
  );
};

export default SendMessagePage;
