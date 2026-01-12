import './Footer.scss';
import { useThemeApply } from '../../hooks/useThemeApply';
import { Link, useNavigate } from 'react-router-dom';
// import QRCodeImage from '../../assets/QRCode/QRCodeDefault.png';
import { Logo } from '../Header/Logo/Logo';
// Компонент отвечающий за Футер (Footer) или же подвал страницы с полезными страницами
export const Footer: React.FC = () => {
  useThemeApply();

  const handleExternalLink = (url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <footer className='footer'>
      <div className='footer__container'>
        
        {/* Верхняя часть футера */}
        <div className='footer__top'>
          {/* Логотип и описание */}
          <div className='footer__brand'>
            <div className='footer__logo'>
              <Logo onClick={handleLogoClick} size='medium' />
              <span className='footer__logo-text'>Events Together</span>
              <span className='footer__logo-subtitle'>— ETog</span>
            </div>
            <p className='footer__description'>
              Платформа для поиска и создания мероприятий. 
              Находите события по интересам или организуйте свои собственные.
            </p>
            
            {/* Социальные сети */}
            <div className='footer__social'>
              <button 
                className='footer__social-button'
                onClick={() => handleExternalLink('https://vk.com')}
                aria-label='Мы во ВКонтакте'
              >
                <span className='footer__social-icon'>VK</span>
                <span className='footer__social-text'>ВКонтакте</span>
              </button>
              
              <button 
                className='footer__social-button'
                onClick={() => handleExternalLink('https://t.me/events_together')}
                aria-label='Мы в Telegram'
              >
                <span className='footer__social-icon'>TG</span>
                <span className='footer__social-text'>Telegram</span>
              </button>

                 <button 
                className='footer__social-button'
                onClick={() => handleExternalLink('https://t.me/etog_bot')}
                aria-label='Мы в Telegram'
              >
                <span className='footer__social-icon'>TG Bot</span>
                <span className='footer__social-text'>Telegram Бот</span>
              </button>
            </div>
          </div>

          {/* QR код
          <div className='footer__qr-section'>
            <div className='footer__qr-container'>
              <img
                src={QRCodeImage}
                alt='QR код для скачивания приложения'
                className='footer__qr-image'
              />
              <p className='footer__qr-text'>Сканируйте для быстрого доступа</p>
            </div>
          </div> */}
        </div>

        {/* Навигационные колонки */}
        <div className='footer__nav'>
          {/* Колонка 1: Основная навигация */}
          <div className='footer__column'>
            <h3 className='footer__column-title'>Навигация</h3>
            <ul className='footer__list'>
              <li className='footer__list-item'>
                <Link to='/' className='footer__link'>Главная</Link>
              </li>
              <li className='footer__list-item'>
                <Link to='/CreateEvent' className='footer__link'>Создать мероприятие</Link>
              </li>
              <li className='footer__list-item'>
                <Link to='/MyAccount' className='footer__link'>Мой профиль</Link>
              </li>
              {/* <li className='footer__list-item'>
                <Link to='/FavoriteEvents' className='footer__link'>Избранное</Link>
              </li>
              <li className='footer__list-item'>
                <Link to='/RecommendationEvents' className='footer__link'>Рекомендации</Link>
              </li> */}
            </ul>
          </div>

          {/* Колонка 2: Полезные ссылки */}
          <div className='footer__column'>
            <h3 className='footer__column-title'>Полезное</h3>
            <ul className='footer__list'>
              <li className='footer__list-item'>
                <Link to='/EventRegulations' className='footer__link'>Регламент мероприятий</Link>
              </li>
              <li className='footer__list-item'>
                <Link to='/OrganizerRules' className='footer__link'>Правила организаторов</Link>
              </li>
              <li className='footer__list-item'>
                <Link to='/TechnicalRequirements' className='footer__link'>Тех. требования</Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Юридическая информация */}
          <div className='footer__column'>
            <h3 className='footer__column-title'>Юридическая информация</h3>
            <ul className='footer__list'>
              <li className='footer__list-item'>
                <Link to='/UserAgreement' className='footer__link'>Пользовательское соглашение</Link>
              </li>
              <li className='footer__list-item'>
                <Link to='/PrivacyPolicy' className='footer__link'>Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>
    

         {/* Колонка 4: Поддержка */}
          <div className='footer__column'>
            <h3 className='footer__column-title'>Поддержка</h3>
            <ul className='footer__list'>
              <li className='footer__list-item'>
                <Link to='/Support' className='footer__link'>Техническая поддержка</Link>
              </li>
               {/* <li className='footer__list-item'>
                <Link to='/ContactUs' className='footer__link'>Связаться с нами</Link>
              </li> */}
              <li className='footer__list-item'>
                <Link to='/AboutUs' className='footer__link'>О компании</Link>
              </li>
            </ul>
          </div>
              </div>

        {/* Нижняя часть футера */}
        <div className='footer__bottom'>
          <div className='footer__copyright'>
            <p className='footer__copyright-text'>
              © {new Date().getFullYear()} Events Together — ETog. Все права защищены.
            </p>
            <p className='footer__copyright-subtext'>
              Платформа для организации и поиска мероприятий
            </p>
          </div>
          
          {/* <div className='footer__legal-links'>
            <Link to='/UserAgreement' className='footer__legal-link'>Соглашение</Link>
            <span className='footer__legal-separator'>•</span>
            <Link to='/PrivacyPolicy' className='footer__legal-link'>Конфиденциальность</Link>
            <span className='footer__legal-separator'>•</span>
            <Link to='/CookiePolicy' className='footer__legal-link'>Cookie</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};