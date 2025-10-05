import './Footer.scss';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useNavigate } from 'react-router-dom';

// Компонент отвечающий за Футер (Footer) или же подвал страницы с полезными страницами
export const Footer: React.FC = () => {
  useThemeApply();
  const navigate = useNavigate();
  // Переход на страницу "Связаться с нами"
  const handleContactClick = (): void => {
    navigate('/ContactUs');
  };
  // Переход на страницу "Поддержки"
  const handleSupportClick = (): void => {
    navigate('/Support');
  };
  // Переход на страницу "О нас"
  const handleAboutClick = (): void => {
    navigate('/AboutUs');
  };
  // Переход на страницу "Юридических документов"
  const handleLegalClick = (): void => {
    navigate('/LegalDocuments');
  };
  // Переход в нашу социальную сеть Телеграм канал
  const handleTelegramClick = (): void => {
    alert('Мы в Telegram');
  };
  // Переход в наше сообщество ВКонтакте
  const handleVkClick = (): void => {
    alert('Мы во Вконтакте');
  };

  return (
    // Текста для перехода на страницы
    <footer className='footer'>
      <div className='footer-column'>
        <p onClick={handleContactClick}>Связаться с нами</p>
        <p onClick={handleSupportClick}>Поддержка</p>
      </div>
      <div className='footer-column'>
        <p onClick={handleAboutClick}>О нас</p>
        <p onClick={handleLegalClick}>Юридические документы</p>
      </div>
      <div className='footer-column'>
        <p onClick={handleTelegramClick}>Мы в Telegram</p>
        <p onClick={handleVkClick}>Мы во Вконтакте</p>
      </div>
    </footer>
  );
};
