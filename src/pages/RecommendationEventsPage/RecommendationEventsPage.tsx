import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import EventSection from '../../components/EventSection/EventSection';
import { RecomendationContent } from '../../components/RecomendationContent/RecomendationContent'
// Страница с рекомендациями, специально для вас
const RecommendationEventsPage: React.FC = () => {
  useDocumentTitle('Рекомендуем посетить | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <RecomendationContent/>
      <EventSection/>
    </div>
  );
};

export default RecommendationEventsPage;
