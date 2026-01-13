import React, { useState, useCallback } from 'react';
import { DatePicker } from './DatePicker/DatePicker';
import { EventTypeDropdown } from '../CreateEventContent/EventTypeDropdown/EventTypeDropdown';
import './Filters.scss';
import { useThemeApply } from '../../hooks/useThemeApply';
import type { EventType } from '../../store/constants/eventTypeOptions';

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  className?: string;
}

export interface FilterValues {
  date?: Date | null;
  eventType?: EventType | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minVisitors?: number | null;
  maxVisitors?: number | null;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange, className = '' }) => {
  useThemeApply();
  const [filters, setFilters] = useState<FilterValues>({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [visitorsRange, setVisitorsRange] = useState({ min: '', max: '' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);

  const handleDateSelect = useCallback((date: Date | null) => {
    setSelectedDate(date);
    const newFilters = { ...filters, date };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleEventTypeSelect = useCallback((eventType: string) => {
    const typedEventType = eventType as EventType;
    setSelectedEventType(typedEventType);
    const newFilters = { ...filters, eventType: typedEventType };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);

    const newFilters = {
      ...filters,
      minPrice: newPriceRange.min ? Number(newPriceRange.min) : null,
      maxPrice: newPriceRange.max ? Number(newPriceRange.max) : null,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleVisitorsChange = (type: 'min' | 'max', value: string) => {
    const newVisitorsRange = { ...visitorsRange, [type]: value };
    setVisitorsRange(newVisitorsRange);

    const newFilters = {
      ...filters,
      minVisitors: newVisitorsRange.min ? Number(newVisitorsRange.min) : null,
      maxVisitors: newVisitorsRange.max ? Number(newVisitorsRange.max) : null,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterValues = {};
    setFilters(clearedFilters);
    setPriceRange({ min: '', max: '' });
    setVisitorsRange({ min: '', max: '' });
    setSelectedDate(null);
    setSelectedEventType(null);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    value => value !== null && value !== undefined && value !== ''
  );

  return (
    <div className={`filters-container ${className}`}>
      <div className="filters-header">
        <h3 className="filters-title">Фильтры мероприятий</h3> 
        {hasActiveFilters && (
          <h3 className='filter-label'> Активные фильтры: {Object.values(filters).filter(v => v).length}</h3>
        )}
        {hasActiveFilters && (
          <button 
            type="button" 
            onClick={handleClearFilters}
            className="clear-filters-btn"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      <div className="filters-grid">
        {/* Фильтр по дате */}
        <div className="filter-group">
          <label className="filter-label">Дата проведения</label>
          <DatePicker 
            onSelect={handleDateSelect} 
            className="filter-input"
            selectedDate={selectedDate}
          />
        </div>

        {/* Фильтр по типу мероприятия */}
        <div className="filter-group">
          <label className="filter-label">Тип мероприятия</label>
          <EventTypeDropdown 
            onSelect={handleEventTypeSelect} 
            selectedValue={selectedEventType}
          />
        </div>

        {/* Фильтр по цене */}
        <div className="filter-group">
          <label className="filter-label">Цена</label>
          <div className="price-range-inputs">
            <div className="price-input-wrapper">
              <input
                type="number"
                placeholder="От"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="price-input"
                min="0"
              />
            </div>
            <span className="price-separator">—</span>
            <div className="price-input-wrapper">
              <input
                type="number"
                placeholder="До"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="price-input"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Фильтр по количеству посетителей */}
        <div className="filter-group">
          <label className="filter-label">Количество посетителей</label>
          <div className="price-range-inputs">
            <div className="price-input-wrapper">
              <input
                type="number"
                placeholder="От"
                value={visitorsRange.min}
                onChange={(e) => handleVisitorsChange('min', e.target.value)}
                className="price-input"
                min="0"
              />
            </div>
            <span className="price-separator">—</span>
            <div className="price-input-wrapper">
              <input
                type="number"
                placeholder="До"
                value={visitorsRange.max}
                onChange={(e) => handleVisitorsChange('max', e.target.value)}
                className="price-input"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};