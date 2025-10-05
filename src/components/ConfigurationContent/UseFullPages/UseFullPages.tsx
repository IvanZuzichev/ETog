import './UseFullPages.scss';
import { useNavigate } from 'react-router-dom';
import { useThemeApply } from '../../../hooks/useThemeApply';

interface UseFullPagesProps {
  className?: string;
}

// Компонент отвечающий за ВРЕМЕННЫЙ компонент, выводивший все существующие страницы
// Был создан, как заглушка, чтобы на странице не было так пусто так как класс ThemeToggleButton не занимает много места
export const UseFullPages: React.FC<UseFullPagesProps> = () => {
  const navigate = useNavigate();
  useThemeApply();
  // Переход на страницу "Связаться с нами"
  const handleContactClick = (): void => {
    navigate('/ContactUs');
  };

  // Переход на страницу "Поддержка"
  const handleSupportClick = (): void => {
    navigate('/Support');
  };

  // переход на страницу "О нас"
  const handleAboutClick = (): void => {
    navigate('/AboutUs');
  };
  // Переход на страницу с юрилическими документами веб-сайта
  const handleLegalClick = (): void => {
    navigate('/LegalDocuments');
  };

  return (
    <div className={`usefull-pages`}>
      <div className='usefull-pages-header'>
        <h3 className='usefull-pages-title'>Полезные страницы (если не нашли)</h3>
      </div>
      {/* Текст для перехода на страницы без учета авторизации (Доступные всем)*/}
      <div className='usefull-pages-links'>
        <p className='usefull-pages-link' onClick={handleContactClick}>
          {' '}
          Для связи с нами
        </p>
        <p className='usefull-pages-link' onClick={handleSupportClick}>
          {' '}
          Для помощи вам
        </p>
        <p className='usefull-pages-link' onClick={handleAboutClick}>
          {' '}
          О нашем проекте
        </p>
        <p className='usefull-pages-link' onClick={handleLegalClick}>
          {' '}
          Документы
        </p>
      </div>
    </div>
  );
};
