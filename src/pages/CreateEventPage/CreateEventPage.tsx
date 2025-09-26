import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import React from 'react';
import CreateEventContent from '../../components/CreateEventContent/CreateEventContent';


const CreateEventPage: React.FC = () => {

  useThemeApply();
  
  return (
    <div className='main-page-wrapper'>
      <Header/>
        <CreateEventContent/>
      <Footer/>
    </div>
  );
}

export default CreateEventPage;