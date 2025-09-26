import { Header } from '../../components/Header/Header';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const SubscribersPage: React.FC = () => {
  useThemeApply();
   useDocumentTitle('Мероприятия подписок | Events Together — ETog');
  return (
    <div className='main-page-wrapper'>
      <Header/>
        {/* <p>SubscribersPage</p> */}
    </div>
  );
}

export default SubscribersPage;