import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { MainContent } from '../components/MainContent/MainContent';

export function MainPage() {
  return (
    <div className='main-page-wrapper'>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
