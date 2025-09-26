import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ThemeToggleButton } from '../../components/ConfigurationContent/ThemeToggleButton/ThemeToggleButton'
import { UseFullPages } from '../../components/ConfigurationContent/UseFullPages';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const ConfigurationPage: React.FC = () => {
  useThemeApply();
  useDocumentTitle('Настройки | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header/>
        <ThemeToggleButton/>
        <UseFullPages/>
      <Footer/>
    </div>
  );
}

export default ConfigurationPage;