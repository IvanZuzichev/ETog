import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Страница с выводом мероприятий своего аккаунта
const MyAccountPage: React.FC = () => {
  useDocumentTitle('Мой профиль | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
    </div>
  );
};

export default MyAccountPage;
