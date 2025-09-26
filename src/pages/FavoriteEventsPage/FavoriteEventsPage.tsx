import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const FavoriteEventsPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Понравившиеся мероприятия | Events Together — ETog');

  return (
    <div  className='main-page-wrapper'>
      <Header/>
        {/* <p>FavoriteEventsPage</p> */}
    </div>
  );
}

export default FavoriteEventsPage;