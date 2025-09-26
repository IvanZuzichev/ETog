import React from 'react';
import './UseFullPages.scss';
import { useNavigate } from 'react-router-dom'; 
interface UseFullPagesProps {
  className?: string;
}

export const UseFullPages: React.FC<UseFullPagesProps> = ({ 
  className = '' 
}) => {
    const navigate = useNavigate();

  const handleContactClick = (): void => {
    navigate('/ContactUs');
  };

  const handleSupportClick = (): void => {
    navigate('/Support');
  };

  const handleAboutClick = (): void => {
    navigate('/AboutUs');
  };

  const handleLegalClick = (): void => {
    navigate('/LegalDocuments');
  };

  return (
    <div className={`usefull-pages ${className}`}>
      
      <div className="usefull-pages-header">
        <h3 className="usefull-pages-title">Полезные страницы (если не нашли)</h3>
      </div>
      
      <div className="usefull-pages-links">
        <p className="usefull-pages-link" onClick={handleContactClick}> Для связи с нами</p>
        <p className="usefull-pages-link" onClick={handleSupportClick}> Для помощи вам</p>
        <p className="usefull-pages-link" onClick={handleAboutClick}> О нашем проекте</p>
        <p className="usefull-pages-link" onClick={handleLegalClick}> Документы</p>
      </div>
      
    </div>
  );
};