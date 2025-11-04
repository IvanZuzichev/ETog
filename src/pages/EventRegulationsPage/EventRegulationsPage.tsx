import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { EventRegulations } from '../../components/EventRegulations/EventRegulations';

// Страница с документами на сайте
const EventRegulationsPage: React.FC = () => {
  useDocumentTitle('Регламент проведения мероприятий | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <Header />
      <EventRegulations />
      <Footer />
    </div>
  );
};

export default EventRegulationsPage;
