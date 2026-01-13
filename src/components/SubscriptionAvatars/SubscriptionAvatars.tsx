import React from 'react';
import './SubscriptionAvatars.scss';
import { mockAuthors } from '../../api/mockAuthor';

interface SubscriptionAvatarsProps {
  showEmptyState?: boolean; 
}

export const SubscriptionAvatars: React.FC<SubscriptionAvatarsProps> = ({ 
  showEmptyState = false 
}) => {
  const hasSubscriptions = mockAuthors.length > 0 && !showEmptyState;

  return (
    <div className="subscription-avatars">
      <div className="subscription-avatars__container">
        <p className="subscription-avatars__title">Мои подписки:</p>
        
        {hasSubscriptions ? (
          <div className="subscription-avatars__scroll">
            {mockAuthors.map((author) => (
              <div key={author.id} className="subscription-avatars__item">
                <div className="subscription-avatars__avatar">
                  <img 
                    src={author.avatarUrl} 
                    alt={author.name}
                    className="subscription-avatars__image"
                  />
                </div>
                <span className="subscription-avatars__name">
                  {author.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="subscription-avatars__empty">
            <p className="subscription-avatars__empty-text">
              У вас пока нет подписок
            </p>
            <p className="subscription-avatars__empty-hint">
              Начните подписываться на организаторов, чтобы видеть их мероприятия здесь
            </p>
          </div>
        )}
      </div>
    </div>
  );
};