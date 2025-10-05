import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieContent.scss';

interface CookieContentProps {
  className?: string;
}

// Компонент отвечающий за предупреждение об использовании файлов куки на сайте
const CookieContent: React.FC<CookieContentProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieContent');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  // Метод для подтверждения согласия пользователям условий
  const handleAccept = (): void => {
    localStorage.setItem('cookieContent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-content ${className}`}>
      <div className='cookie-content__content'>
        <p className='cookie-content__text'>
          Мы используем файлы cookie, чтобы обеспечивать правильную работу нашего веб-сайта.
          <Link to='/LegalDocuments' className='cookie-content__link'>
            Правила использования файлов cookie
          </Link>
        </p>
        <button className='cookie-content__button' onClick={handleAccept} type='button'>
          Согласен
        </button>
      </div>
    </div>
  );
};

export default CookieContent;
