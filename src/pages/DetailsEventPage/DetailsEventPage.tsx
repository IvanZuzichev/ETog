import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Страница, которая открывается при нажатии на любую карточку мероприятия
const DetailsEvent: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Карточка мероприятия | Events Together — ETog');
  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <Footer />
    </div>
  );
};

export default DetailsEvent;
