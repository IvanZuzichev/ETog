import './FavoriteContent.scss';

export const FavoriteContent: React.FC = () => {
  return (
    <div className="favorite-content">
      <div className="favorite-content__container">
        <div className="favorite-content__header">
          <h1 className="favorite-content__title">
            <span className="favorite-content__main-title">Избранные мероприятия</span>
            <span className="favorite-content__subtitle">— ваша коллекция</span>
          </h1>
        </div>
        
        <p className="favorite-content__description">
          Здесь собраны все события, которые вы добавили в избранное. 
          Возвращайтесь к ним в любое время, делитесь с друзьями или планируйте скорее свое личное участие. 
        </p>
      </div>
    </div>
  );
};