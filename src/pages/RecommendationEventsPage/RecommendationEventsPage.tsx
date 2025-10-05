import { Header } from '../../components/Header/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Страница с рекомендациями, специально для вас
const RecommendationEventsPage: React.FC = () => {
  useDocumentTitle('Рекомендуем посетить | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
    </div>
  );
};

export default RecommendationEventsPage;
