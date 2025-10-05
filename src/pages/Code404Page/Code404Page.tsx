import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Code404Content } from '../../components/Code404Content/Code404Content';

// Страница не найдено 404 код
const Code404Page: React.FC = () => {
  useDocumentTitle('Не найдено | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <Code404Content />
      <Footer />
    </div>
  );
};

export default Code404Page;
