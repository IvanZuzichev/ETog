import React, { useState, useEffect } from 'react';
import EventCard from '../EventCard/EventCard';
import { mockEvents } from '../../api/mockEvents';
import './EventSection.scss';

const EventSection: React.FC = () => {
  const [visibleEvents, setVisibleEvents] = useState(mockEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Эмуляция загрузки дополнительных событий
  const loadMoreEvents = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Имитация задержки запроса
    setTimeout(() => {
      const currentLength = visibleEvents.length;
      const nextEvents = mockEvents.slice(currentLength, currentLength + 8);
      
      if (nextEvents.length === 0) {
        setHasMore(false);
      } else {
        setVisibleEvents(prev => [...prev, ...nextEvents]);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  // Infinite scroll обработчик
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreEvents();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  // Определение количества колонок в зависимости от ширины экрана
  const getColumnsCount = () => {
    if (window.innerWidth >= 1440) return 4;
    if (window.innerWidth >= 744) return 3;
    return 2;
  };

  const [columnsCount, setColumnsCount] = useState(getColumnsCount());

  useEffect(() => {
    const handleResize = () => {
      setColumnsCount(getColumnsCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="event-section">

      <div className={`event-section__grid event-section__grid--${columnsCount}-cols`}>
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {isLoading && (
        <div className="event-section__loading">
          <div className="event-section__spinner"></div>
          <p>Загрузка мероприятий...</p>
        </div>
      )}

      {!hasMore && visibleEvents.length > 0 && (
        <div className="event-section__end">
          <p>Вы просмотрели все мероприятия</p>
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="event-section__load-more">
          <button 
            onClick={loadMoreEvents}
            className="event-section__load-more-btn"
          >
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
};

export default EventSection;