import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const MyAccountPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Мой профиль | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header/>
      {/* <p>MyAccountPage</p> */}
    </div>
  );
}

export default MyAccountPage;