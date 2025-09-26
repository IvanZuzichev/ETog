import React from 'react';
import { Header } from '../../components/Header/Header';
// import { MainContent } from '../../components/MainContent/MainContent';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const MainPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Найди свою компанию для любого события | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header/>
      {/* <MainContent/> */}
    </div>
  );
  

}

export default MainPage;

