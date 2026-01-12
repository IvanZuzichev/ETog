import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { PrivacyPolicy } from '../../components/PrivacyPolicy/PrivacyPolicy';

// Страница с документами на сайте
const PrivacyPolicyPage: React.FC = () => {
  useDocumentTitle('Политика конфиденциальности | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
