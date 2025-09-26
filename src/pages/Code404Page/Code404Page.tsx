import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Code404Content } from '../../components/Code404Content/Code404Content'
const Code404Page: React.FC = () => {
  useThemeApply();
 useDocumentTitle('Не найдено | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header/>
      <Code404Content />
      <Footer/>
    </div>
  );
}

export default Code404Page;