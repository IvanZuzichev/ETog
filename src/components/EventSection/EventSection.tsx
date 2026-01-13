import React, { useState, useEffect, useCallback } from 'react';
import EventCard from '../EventCard/EventCard';
import { mockEvents } from '../../api/mockEvents';
import { Filters } from '../Filters/Filters';
import type { FilterValues } from '../Filters/Filters';
import './EventSection.scss';

// Вспомогательная функция для получения числового значения цены
const getPriceValue = (price: number | string): number => {
  if (typeof price === 'string') {
    if (price === 'Бесплатно' || price.toLowerCase().includes('бесплат')) {
      return 0;
    }
    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
  }
  return price;
};

// Вспомогательная функция для получения числового значения посетителей
const getVisitorsValue = (visitors: number | string): number => {
  if (typeof visitors === 'string') {
    if (visitors === 'Не ограничено' || visitors.toLowerCase().includes('не ограничено')) {
      return Infinity; // Используем Infinity для "Не ограничено"
    }
    const parsed = parseInt(visitors);
    return isNaN(parsed) ? 0 : parsed;
  }
  return visitors;
};

// Функция фильтрации мероприятий
const filterEvents = (events: typeof mockEvents, filters: FilterValues) => {
  return events.filter(event => {
    // Фильтр по дате
    if (filters.date) {
      const eventDate = new Date(event.date);
      const filterDate = new Date(filters.date);
      if (eventDate.toDateString() !== filterDate.toDateString()) {
        return false;
      }
    }

    // Фильтр по типу мероприятия
    if (filters.eventType && event.category !== filters.eventType) {
      return false;
    }

    // Фильтр по цене
    const eventPriceValue = getPriceValue(event.price);
    
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      if (eventPriceValue < filters.minPrice) return false;
    }
    
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      if (eventPriceValue > filters.maxPrice) return false;
    }

    // Фильтр по количеству посетителей
    const eventVisitorsValue = getVisitorsValue(event.visitor);
    
    if (filters.minVisitors !== undefined && filters.minVisitors !== null) {
      // Для "Не ограничено" (Infinity) всегда true, иначе сравниваем
      if (eventVisitorsValue !== Infinity && eventVisitorsValue < filters.minVisitors) {
        return false;
      }
    }
    
    if (filters.maxVisitors !== undefined && filters.maxVisitors !== null) {
      // "Не ограничено" не должно показываться, если задан максимальный лимит
      if (eventVisitorsValue === Infinity) {
        return false;
      }
      if (eventVisitorsValue > filters.maxVisitors) {
        return false;
      }
    }

    return true;
  });
};

const EventSection: React.FC = () => {
  const [allEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [visibleEvents, setVisibleEvents] = useState(mockEvents.slice(0, 8));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

  // Применение фильтров
  const handleFilterChange = useCallback((filters: FilterValues) => {
    setActiveFilters(filters);
    
    // Фильтруем мероприятия
    const filtered = filterEvents(allEvents, filters);
    setFilteredEvents(filtered);
    
    // Сбрасываем пагинацию
    setVisibleEvents(filtered.slice(0, 8));
    setHasMore(filtered.length > 8);
  }, [allEvents]);

  // Эмуляция загрузки дополнительных событий
  const loadMoreEvents = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const currentLength = visibleEvents.length;
      const nextEvents = filteredEvents.slice(currentLength, currentLength + 8);
      
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

  // Определение количества колонок
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
      {/* Фильтры */}
      <Filters onFilterChange={handleFilterChange} />

      {/* Счетчик найденных мероприятий*/}
      <div className="events-counter">
        Найдено мероприятий: {filteredEvents.length}
      </div> 

      {/* Сетка мероприятий */}
      {visibleEvents.length > 0 ? (
        <div className={`event-section__grid event-section__grid--${columnsCount}-cols`}>
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="no-events-message">
          <h3>Мероприятия не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
        </div>
      )}

      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="event-section__loading">
          <div className="event-section__spinner"></div>
          <p>Загрузка мероприятий...</p>
        </div>
      )}

      {/* Сообщение о конце списка */}
      {!hasMore && visibleEvents.length > 0 && (
        <div className="event-section__end">
          <p>Вы просмотрели все мероприятия</p>
        </div>
      )}

      {/* Кнопка "Показать еще" */}
      {!isLoading && hasMore && visibleEvents.length > 0 && (
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