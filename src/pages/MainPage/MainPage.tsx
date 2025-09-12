import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { MainContent } from '../../components/MainContent/MainContent';
import { useThemeApply } from '../../hooks/useThemeApply';

const MainPage: React.FC = () => {
  useThemeApply();

  return (
    <div className='main-page-wrapper'>
      <Header/>
      <MainContent/>
      <Footer/>
    </div>
  );
  

}

export default MainPage;

