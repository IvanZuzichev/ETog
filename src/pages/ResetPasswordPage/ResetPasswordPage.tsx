import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ResetPasswordContent } from '../../components/ResetPasswordContent/ResetPasswordContent';
import { useState } from 'react';

// Страница смены пароля (ввод полученного кода и нового пароля)
const ResetPasswordPage: React.FC = () => {
  useDocumentTitle('Смена пароля | Events Together — ETog');

  const [formData, setFormData] = useState({
    email: '',
    code: '',
    password: '',
    repeat_password: '',
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
      <ResetPasswordContent formData={formData} onFormChange={handleFormChange} />
      {/* <Footer /> */}
    </div>
  );
};

export default ResetPasswordPage;
