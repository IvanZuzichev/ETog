import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockEvents } from '../../api/mockEvents';
import type { Event } from '../../api/mockEvents';
import './EventDetailPage.scss';
import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { HeartIcon } from '../../components/icons/HeartIcon';

const EventDetailPage: React.FC = () => {
  useThemeApply();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Используем хук useDocumentTitle на верхнем уровне
  useDocumentTitle(event ? `${event.title} | Events Together — ETog` : 'Загрузка мероприятия | Events Together — ETog');

  useEffect(() => {
    const fetchEvent = () => {
      setLoading(true);
      
      // Имитация загрузки данных
      setTimeout(() => {
        const eventId = parseInt(id || '0');
        const foundEvent = mockEvents.find(e => e.id === eventId);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          navigate('/404');
        }
        
        setLoading(false);
      }, 300);
    };

    fetchEvent();
  }, [id, navigate]);

  const handleJoinEvent = () => {
    if (isJoined) return;
    setIsJoined(true);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShareEvent = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert('Ссылка на мероприятие скопирована в буфер обмена!'))
      .catch(() => alert('Не удалось скопировать ссылку'));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    };
    return date.toLocaleDateString('ru-RU', options);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price: number | 'Бесплатно') => {
    if (price === 'Бесплатно') return 'Бесплатно';
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  if (loading) {
    return (
      <div className="event-detail-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка мероприятия...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-detail-not-found">
        <h2>Мероприятие не найдено</h2>
        <p>Извините, запрашиваемое мероприятие не существует или было удалено.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className='main-page-wrapper'>
      <Header />
      <div className="header-spacer"></div>
      <div className="event-detail-container">
        <div className="event-detail-content">

          {/* Основное содержимое */}
          <div className="event-detail-main">
            {/* Изображение */}
            <div className="event-image-section">
              <div className="event-image-container">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="event-main-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/1200x600/7b1fa2/ffffff?text=${encodeURIComponent(event.title)}`;
                  }}
                />
              </div>
            </div>
            
            {/* Заголовок и категория */}
            <div className="event-detail-header">
              <div className="event-detail-title-section">
                <h1 className="event-detail-title">{event.title}</h1>
                <p className="event-organizer">
                  Организатор: <span className="organizer-name">{event.organizer}</span>
                  <span className="event-category-badge">{event.category}</span>
                </p>
              </div>
              
              <div className="event-detail-actions">
              <button 
                onClick={handleToggleFavorite}
                className={`favorite-button ${isFavorite ? 'favorite-button--active' : ''}`}
                title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                <HeartIcon isActive={isFavorite} size={24} />
              </button>
            </div>
            </div>

            {/* Основная информация в две колонки */}
            <div className="event-info-section">
              {/* Левая колонка - Описание */}
              <div className="event-description-column">
                <div className="event-description-card">
                  <h2>Описание мероприятия</h2>
                  <div className="event-description">
                    <p>
                      {event.description || `Присоединяйтесь к нашему мероприятию "${event.title}"! 
                      Это уникальная возможность погрузиться в мир ${event.category.toLowerCase()}, 
                      познакомиться с единомышленниками и получить незабываемые впечатления.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Правая колонка - Детали и кнопка */}
              <div className="event-details-column">
                <div className="event-details-card">
                  <div className="event-details-list">
                    <div className="event-detail-item">
                      <div className="detail-content">
                        <h3>Дата и время</h3>
                        <p>{formatDate(event.date)} в {formatTime(event.date)}</p>
                      </div>
                    </div>
                    
                    <div className="event-detail-item">
                      <div className="detail-content">
                        <h3>Место проведения</h3>
                        <p>{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="event-detail-item">
                      <div className="detail-content">
                        <h3>Участники</h3>
                        <p>{Math.floor(Math.random() * 50)} человек</p>
                      </div>
                    </div>
                    
                    <div className="event-detail-item">
                      <div className="detail-content">
                        <h3>Стоимость</h3>
                        <p className={`event-price ${event.price === 'Бесплатно' ? 'event-price--free' : ''}`}>
                          {formatPrice(event.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleJoinEvent}
                    className={`join-button ${isJoined ? 'join-button--joined' : ''}`}
                    disabled={isJoined}
                    title={isJoined ? 'Вы уже зарегистрированы на это мероприятие' : 'Зарегистрироваться на мероприятие'}
                  >
                    {isJoined ? 'Вы участвуете' : 'Принять участие'}
                  </button>
                  
                  {event.price !== 'Бесплатно' && (
                    <p className="payment-note">Оплата производится на месте</p>
                  )}
                </div>
              </div>
            </div>

            {/* Блок организатора */}
            <div className="organizer-section">
              <div className="organizer-card">
                <h2>Организатор</h2>
                <div className="organizer-info">
                  <Link 
                    to={`/user/${event.id}`} // Используем event.id как пример, можно заменить на реальный ID организатора
                    className="organizer-avatar-link"
                  >
                    <div className="organizer-avatar">
                      {event.organizer.charAt(0)}
                    </div>
                  </Link>
                  <div className="organizer-details">
                    <div className="organizer-header">
                      <h3>{event.organizer}</h3>
                      <div className="organizer-rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-text">5.0 (12 отзывов)</span>
                      </div>
                    </div>
                    <p className="organizer-stats">Провел(а) {Math.floor(Math.random() * 20) + 5} мероприятий</p>
                    <button 
                      onClick={handleSubscribe}
                      className={`subscribe-button ${isSubscribed ? 'subscribe-button--subscribed' : ''}`}
                    >
                      {isSubscribed ? '✓ Вы подписаны' : 'Подписаться'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rules-card">
                <h2>Правила участия</h2>
                <ul className="rules-list">
                  <li>Регистрация обязательна для всех участников</li>
                  <li>Приходите за 15 минут до начала</li>
                  <li>Иметь при себе документ, удостоверяющий личность</li>
                  <li>Соблюдайте правила мероприятия</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetailPage;