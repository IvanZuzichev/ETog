import './LegalDocumentsContent.scss';
import { useThemeApply } from '../../hooks/useThemeApply';
import { LEGAL_DOCUMENTS } from '../../store/constants/legalDocumentsConstants';

// Компонент отвечающий за документацию на сайте
export const LegalDocumentsContent: React.FC = () => {
  useThemeApply();
  // Переменная для установления формата текста
  const formatDocumentText = (text: string, docIndex: number) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return lines.map((line, lineIndex) => {
      const key = `${docIndex}-${lineIndex}`;
      // Условие для выбора формата текста
      if (
        line.includes('Соглашение об обработке персональных данных') ||
        line.includes('Пользовательское соглашение для ETog') ||
        line.includes('Регламент проведения мероприятий ETog') ||
        line.includes('Правила для организаторов мероприятий ETog') ||
        line.includes('Требования к ПО')
      ) {
        return (
          <h2 key={key} className='document-title'>
            {line.trim()}
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
  // Документация из отдельного файла
  const allDocuments = [
    { content: LEGAL_DOCUMENTS.PRIVACY_POLICY, title: 'Политика конфиденциальности' },
    { content: LEGAL_DOCUMENTS.TECHNICAL_REQUIREMENTS, title: 'Технические требования' },
    { content: LEGAL_DOCUMENTS.USER_AGREEMENT, title: 'Пользовательское соглашение' },
    { content: LEGAL_DOCUMENTS.EVENT_REGULATIONS, title: 'Регламент мероприятий' },
    { content: LEGAL_DOCUMENTS.ORGANIZER_RULES, title: 'Правила для организаторов' },
  ];
  // Вывод документации на странице
  return (
    <div className='legal-documents-container'>
      <div className='document-content'>
        {allDocuments.map((doc, index) => (
          <div key={index} className='document-section'>
            {formatDocumentText(doc.content, index)}
            {index < allDocuments.length - 1 && <hr className='document-divider' />}
          </div>
        ))}
      </div>
    </div>
  );
};
