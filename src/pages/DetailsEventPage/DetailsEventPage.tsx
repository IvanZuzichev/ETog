import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const DetailsEvent: React.FC = () => {
  useThemeApply();
   useDocumentTitle('Карточка мероприятия | Events Together — ETog');
  return (
    <div className='main-page-wrapper'>
      <Header/>
      {/* <p>DetailsEventPage</p> */}
      <Footer/>
    </div>
  );
}

export default DetailsEvent;