import React from 'react';
import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Главная страница сайта
const MainPage: React.FC = () => {
  useDocumentTitle('Найди свою компанию для любого события | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
    </div>
  );
};

export default MainPage;
