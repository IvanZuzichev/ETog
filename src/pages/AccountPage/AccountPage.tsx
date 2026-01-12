import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useState } from 'react';
import { AccountContent } from '../../components/AccountContent/AccountContent';

// Страница "Мой профиль"
const AccountPage: React.FC = () => {
  useDocumentTitle('Личный кабинет | Events Together — ETog');

  const [formData, setFormData] = useState({
    login: '',
    email: '',
    description: '',
    password: '',
  });

  const handleFormChange = (field: string, value: string | boolean | Date) => {
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
      <AccountContent formData={formData} onFormChange={handleFormChange} />
      <Footer />
    </div>
  );
};

export default AccountPage;
