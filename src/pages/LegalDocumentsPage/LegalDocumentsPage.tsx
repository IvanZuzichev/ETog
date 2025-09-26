import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { LegalDocumentsContent } from '../../components/LegalDocumentsContent/LegalDocumentsContent';


const LegalDocumentsPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Документы | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header/>
      <LegalDocumentsContent/>
      <Footer/>
    </div>
  );
}

export default LegalDocumentsPage;