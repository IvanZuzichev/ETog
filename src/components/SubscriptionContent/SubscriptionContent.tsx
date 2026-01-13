import './SubscriptionContent.scss';

export const SubscriptionContent: React.FC = () => {
  return (
    <div className="subscription-content">
      <div className="subscription-content__container">
        <div className="subscription-content__header">
          <h1 className="subscription-content__title">
            <span className="subscription-content__main-title">Мои подписки</span>
            <span className="subscription-content__subtitle">— ваша лента</span>
          </h1>
        </div>
        <p className="subscription-content__description">
          Здесь собраны все мероприятия от организаторов, на которых вы подписаны. 
          Будьте в курсе самых свежих событий и никогда не пропускайте интересное!
        </p>
      </div>
    </div>
  );
};