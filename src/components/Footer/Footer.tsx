import './Footer.css';

export function Footer() {
  // Функции для обработки кликов
  const handleContactClick = () => {
    alert('Связаться с нами');
  };

  const handleSupportClick = () => {
    alert('Поддержка');
  };

  const handleAboutClick = () => {
    alert('О нас');
  };

  const handleLegalClick = () => {
    alert('Юридические документы');
  };

  const handleTelegramClick = () => {
    alert('Мы в Telegram');
  };

  const handleVkClick = () => {
    alert('Мы во Вконтакте');
  };

  return (
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
}
