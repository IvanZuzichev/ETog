import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ThemeToggleButton } from '../../components/ConfigurationContent/ThemeToggleButton/ThemeToggleButton';
import { UseFullPages } from '../../components/ConfigurationContent/UseFullPages';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Страница настройки веб-сайта
const ConfigurationPage: React.FC = () => {
  useDocumentTitle('Настройки | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <ThemeToggleButton />
      {/* Данный компонент временный для наполненности страницы */}
      <UseFullPages />
      <Footer />
    </div>
  );
};

export default ConfigurationPage;
