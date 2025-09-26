import { Header } from '../../components/Header/Header';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const RecommendationEventsPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Рекомендуем посетить | Events Together — ETog');
  
  return (
    <div className='main-page-wrapper'>
      <Header/>
        {/* <p>RecommendationEventsPage</p> */}
    </div>
  );
}

export default RecommendationEventsPage;