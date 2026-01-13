import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import EventSection from '../../components/EventSection/EventSection';
import {FavoriteContent} from '../../components/FavoriteContent/FavoriteContent'
// Страница с понравившимися мероприятиями
const FavoriteEventsPage: React.FC = () => {
  useDocumentTitle('Избранные мероприятия | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <FavoriteContent/>
       <EventSection />
    </div>
  );
};

export default FavoriteEventsPage;
