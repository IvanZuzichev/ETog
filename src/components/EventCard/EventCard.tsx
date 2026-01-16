import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Event } from '../../api/mockEvents';
import './EventCard.scss';
import { HeartIcon } from '../icons/HeartIcon'; 
import { useTheme } from '../../theme/ThemeContext';

interface EventCardProps {
  event: Event;
}


const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useTheme();
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number | 'Бесплатно') => {
    if (price === 'Бесплатно') {
      return 'Бесплатно';
    }
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const getPriceClassName = (price: number | 'Бесплатно') => {
    return `event-card__price ${price === 'Бесплатно' ? 'event-card__price--free' : ''}`;
  };

  const getPlaceholderSVG = () => {
    const theme = document.documentElement.className.includes('dark') ? 'dark' : 'light';
    const bgColor = theme === 'dark' ? '#2C2C2C' : '#F8F9FA';
    const textColor = theme === 'dark' ? '#AAAAAA' : '#666666';
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="${bgColor}"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" 
              fill="${textColor}" text-anchor="middle" dy=".3em">
          ${event.category}
        </text>
      </svg>
    `)}`;
  };

  return (
    <div className="event-card">
      <Link to={`/event/${event.id}`} className="event-card__link">
        <div className="event-card__image-container">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="event-card__image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getPlaceholderSVG();
              target.alt = 'Изображение не загружено';
            }}
          />
          <div className="event-card__category">{event.category}</div>
          
          {/* Кнопка избранного в правом верхнем углу изображения */}
          <button 
            onClick={handleToggleFavorite}
            className={`event-card__favorite ${isFavorite ? 'event-card__favorite--active' : ''}`}
            title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <HeartIcon isActive={isFavorite} size={18} />
          </button>
        </div>
        
        <div className="event-card__content">
          <div className="event-card__info">
            <h3 className="event-card__title">{event.title}</h3>
            <p className="event-card__organizer">{event.organizer}</p>
            <div className="event-card__meta">
              <span className="event-card__date">{formatDate(event.date)}</span>
              <span className="event-card__location">{event.location}</span>
            </div>
          </div>
          
          <div className="event-card__footer">
            <div className={getPriceClassName(event.price)}>
              {formatPrice(event.price)}
            </div>
            <button 
              className="event-card__details-btn"
            >
              Подробнее
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;