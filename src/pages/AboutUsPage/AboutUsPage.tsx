import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useTheme } from '../../theme/ThemeContext';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { AboutUsContent } from '../../components/AboutUsContent/AboutUsContent';

const AboutUsPage: React.FC = () => {
  useThemeApply();
   useDocumentTitle('О нашем проекте | Events Together — ETog');
const { theme } = useTheme(); // Получаем текущую тему

  return (
    <>
      <div className='main-page-wrapper'>
     
      <Header/>
      <AboutUsContent/>
      <Footer/>
      </div>
      </>
  );
}

export default AboutUsPage;