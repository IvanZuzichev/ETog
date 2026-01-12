import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { UserAgreement } from '../../components/UserAgreement/UserAgreement';

// Страница с документами на сайте
const UserAgreementPage: React.FC = () => {
  useDocumentTitle('Пользовательское соглашение | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <UserAgreement />
      <Footer />
    </div>
  );
};

export default UserAgreementPage;
