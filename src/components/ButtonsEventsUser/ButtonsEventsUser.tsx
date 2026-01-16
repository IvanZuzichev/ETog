import React, { useState } from 'react';
import './ButtonsEventsUser.scss';

export const ButtonsEventsUser: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'active-hosted' | 'archived-hosted' | 'active-visited' | 'archived-visited'>('active-hosted');

  const buttons = [
    {
      id: 'active-hosted' as const,
      label: 'Активные проведенные мероприятия',
    },
    {
      id: 'archived-hosted' as const,
      label: 'Архивные проведенные мероприятия',
    },
    {
      id: 'archived-visited' as const,
      label: 'Архивные посещенные мероприятия',
    },
  ];

  return (
    <div className="account-section">
      <div className="buttons-events-containers">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`event-filter-button ${activeButton === button.id ? 'event-filter-button--active' : ''}`}
            onClick={() => setActiveButton(button.id)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};