import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Страница с выводом мероприятий, своих подписок
const SubscribersPage: React.FC = () => {
  useDocumentTitle('Мероприятия подписок | Events Together — ETog');
  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
    </div>
  );
};

export default SubscribersPage;
