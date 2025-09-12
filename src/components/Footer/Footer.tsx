import React from 'react';
import './Footer.css';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigate } from 'react-router-dom'; 

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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

  const handleTelegramClick = (): void => {
    alert('Мы в Telegram');
  };

  const handleVkClick = (): void => {
    alert('Мы во Вконтакте');
  };

  const footerStyle: React.CSSProperties = {
    '--footer-bg': theme.colors.footerheaderBg,
    '--footer-text': theme.colors.footerheaderText,
    '--button-bg': theme.colors.buttonBg,
    '--button-text': theme.colors.buttonText,
  } as React.CSSProperties;

  return (
    <footer className='footer' style={footerStyle}>
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