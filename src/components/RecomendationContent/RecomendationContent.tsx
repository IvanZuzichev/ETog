import './RecomendationContent.scss';

export const RecomendationContent: React.FC = () => {
  return (
    <div className="recomendation-content">
      <div className="recomendation-content__container">
        <div className="recomendation-content__header">
          <h1 className="recomendation-content__title">
            <span className="recomendation-content__main-title">Персональные рекомендации</span>
            <span className="recomendation-content__subtitle">— для вас</span>
          </h1>
        </div>
        
        <p className="recomendation-content__description">
          Наш алгоритм анализирует ваши интересы, историю просмотров и предпочтения, 
          чтобы подбирать мероприятия, которые точно вам понравятся. 
          Чем больше вы используете платформу, тем точнее становятся рекомендации!
        </p>
      </div>
    </div>
  );
};