import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { TechnicalRequirements } from '../../components/TechnicalRequirements/TechnicalRequirements';

// Страница с документами на сайте
const TechnicalRequirementsPage: React.FC = () => {
  useDocumentTitle('Требования к ПО | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <TechnicalRequirements />
      <Footer />
    </div>
  );
};

export default TechnicalRequirementsPage;
