import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { LegalDocumentsContent } from '../../components/LegalDocumentsContent/LegalDocumentsContent';

// Страница с документами на сайте
const LegalDocumentsPage: React.FC = () => {
  useDocumentTitle('Документы | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <LegalDocumentsContent />
      <Footer />
    </div>
  );
};

export default LegalDocumentsPage;
