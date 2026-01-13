import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import EventSection from '../../components/EventSection/EventSection';
import { SubscriptionContent } from '../../components/SubscriptionContent/SubscriptionContent';
import { SubscriptionAvatars  } from '../../components/SubscriptionAvatars/SubscriptionAvatars';
// Страница с выводом мероприятий, своих подписок
const SubscribersPage: React.FC = () => {
  useDocumentTitle('Мероприятия ваших подписок | Events Together — ETog');
  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <SubscriptionContent />
      <SubscriptionAvatars />
      <EventSection/>
    </div>
  );
};

export default SubscribersPage;
