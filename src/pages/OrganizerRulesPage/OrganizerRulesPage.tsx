import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { OrganizerRules } from '../../components/OrganizerRules/OrganizerRules';

// Страница с документами на сайте
const OrganizerRulesPage: React.FC = () => {
  useDocumentTitle('Правила для организаторов мероприятий | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <OrganizerRules />
      <Footer />
    </div>
  );
};

export default OrganizerRulesPage;
