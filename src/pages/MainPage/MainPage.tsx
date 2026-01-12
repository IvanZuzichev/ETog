import React from 'react';
import { Header } from '../../components/Header/Header';
import EventSection from '../../components/EventSection/EventSection';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import './MainPage.scss';

const MainPage: React.FC = () => {
  useDocumentTitle('Найди свою компанию для любого события | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <main className="main-page-content">
      
        <EventSection />
      </main>
    </div>
  );
};

export default MainPage;