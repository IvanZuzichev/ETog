import './EventRegulations.scss';
import { LEGAL_DOCUMENTS } from '../../store/constants/legalDocumentsConstants';

export const EventRegulations: React.FC = () => {
  const formatDocumentText = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return lines.map((line, lineIndex) => {
      const key = `regulations-${lineIndex}`;

      if (line.includes('Регламент проведения мероприятий ETog')) {
        return (
          <h2 key={key} className='document-title'>
            Регламент проведения мероприятий
          </h2>
        );
      }

      if (line.match(/^\d+\.\s/)) {
        return (
          <h3 key={key} className='section-title'>
            {line.trim()}
          </h3>
        );
      }

      if (line.match(/^\d+\.\d+\.\s/)) {
        return (
          <h4 key={key} className='subsection-title'>
            {line.trim()}
          </h4>
        );
      }

      if (line.trim().startsWith('*') || line.trim().startsWith('•') || line.trim().startsWith('—')) {
        return (
          <div key={key} className='list-item-container'>
            <span className='list-marker'>{line.trim().startsWith('—') ? '—' : '•'}</span>
            <span className='list-text'>{line.trim().substring(1).trim()}</span>
          </div>
        );
      }

      if (line.trim() === '') {
        return <br key={key} />;
      }

      return (
        <p key={key} className='paragraph'>
          {line.trim()}
        </p>
      );
    });
  };

  return <div className='event-regulations'>{formatDocumentText(LEGAL_DOCUMENTS.EVENT_REGULATIONS)}</div>;
};
