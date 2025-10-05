import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Страница с понравившимися мероприятиями
const FavoriteEventsPage: React.FC = () => {
  useDocumentTitle('Понравившиеся мероприятия | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
    </div>
  );
};

export default FavoriteEventsPage;
