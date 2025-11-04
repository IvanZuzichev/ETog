import './Footer.scss';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useNavigate } from 'react-router-dom';
import QRCodeImage from '../../assets/QRCode/QRCodeDefault.png';

// Компонент отвечающий за Футер (Footer) или же подвал страницы с полезными страницами
export const Footer: React.FC = () => {
  useThemeApply();
  const navigate = useNavigate();

  // Переход на страницу "Регламент проведения мероприятий"
  const handleEventRegulationsClick = (): void => {
    navigate('/EventRegulations');
  };

 // Переход на страницу "Требования к ПО"
  const handleTechnicalRequirementsClick = (): void => {
    navigate('/TechnicalRequirements');
  };

   // Переход на страницу "Пользовательское соглашение"
  const handleUserAgreementClick = (): void => {
    navigate('/UserAgreement');
  };

   // Переход на страницу "Политика конфиденциальности"
  const handlePrivacyPolicyClick = (): void => {
    navigate('/PrivacyPolicy');
  };

   // Переход на страницу "Правила для организаторов"
  const handleOrganizerRulesClick = (): void => {
    navigate('/OrganizerRules');
  };


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

  // Переход на страницу "Главная"
  const handleMainClick = (): void => {
    navigate('/');
  };

  // Переход в Телеграм канал
  const handleTelegramClick = (): void => {
    alert('Мы в Telegram');
  };
    // Переход в наш Телеграм бот
  const handleTelegramBotClick = (): void => {
    alert('Мы в Telegram, но бот');
  };
  // Переход в наше сообщество ВКонтакте
  const handleVkClick = (): void => {
    alert('Мы во Вконтакте');
  };

  const handleMobileClick = (): void => {
    alert('ссылка на наше мобильное приложение');
  };

  return (
    // Текста для перехода на страницы
    <footer className='footer'>
      <div className='footer-column'>
        <p onClick={handlePrivacyPolicyClick}>Политика конфиденциальности</p>
        <p onClick={handleUserAgreementClick}>Пользовательское соглашение</p>
        <p onClick={handleTechnicalRequirementsClick}>Технические требования к ПО</p>
        <p onClick={handleEventRegulationsClick}>Регламент проведения мероприятий</p>
        <p onClick={handleOrganizerRulesClick}>Правила для организаторов</p>
         <p onClick={handleMainClick}>Events Together — ETog © 2025</p>
      </div>
      <div className='footer-column'>
        <p onClick={handleAboutClick}>О компании</p>
        <p onClick={handleContactClick}>Связаться с нами</p>
        <p onClick={handleSupportClick}>Поддержка</p>
        <p onClick={handleVkClick}>Мы во Вконтакте</p>
         <p onClick={handleTelegramClick}>Мы в Telegram</p>
         <p onClick={handleTelegramBotClick}>Наш Telegram бот</p>
      </div>
      <div className='footer-column'>
        <p onClick={handleMobileClick}>Мобильное приложение</p>
        <div className="qr-code-section">
          <img 
            src={QRCodeImage} 
            alt="QR код для скачивания мобильного приложения" 
            className="qr-code-image"
            onClick={handleMobileClick}
          />
        </div>
      </div>
    </footer>
  );
};