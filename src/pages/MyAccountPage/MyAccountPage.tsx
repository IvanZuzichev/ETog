import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { AccountContent } from '../../components/AccountContent/AccountContent';
import { useState } from 'react';
import EventSection from '../../components/EventSection/EventSection';
import { ButtonsEvents } from '../../components/ButtonsEvents/ButtonsEvents'

// Страница с выводом мероприятий своего аккаунта
const MyAccountPage: React.FC = () => {
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
            <ButtonsEvents/>
            <EventSection/>
            <Footer />
    </div>
  );
};

export default MyAccountPage;
