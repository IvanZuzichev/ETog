import React from 'react';
import { Header } from '../../components/Header/Header';
import {MainContent} from '../../components/MainContent/MainContent'
import EventSection from '../../components/EventSection/EventSection';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import './MainPage.scss';

const MainPage: React.FC = () => {
  useDocumentTitle('Платформа для поиска и создания мероприятий | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <main className="main-page-content">
        <MainContent />
        <EventSection />
      </main>
    </div>
  );
};

export default MainPage;