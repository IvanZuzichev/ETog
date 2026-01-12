import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import React from 'react';
import CreateEventContent from '../../components/CreateEventContent/CreateEventContent';

// Страница  создания нового мероприятия
const CreateEventPage: React.FC = () => {
  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <CreateEventContent />
      <Footer />
    </div>
  );
};

export default CreateEventPage;
