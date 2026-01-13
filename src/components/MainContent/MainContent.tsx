import './MainContent.scss';

export const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      <div className="main-content__container">
        <div className="main-content__header">
          <h1 className="main-content__title">
            <span className="main-content__main-title">Events Together</span>
            <span className="main-content__subtitle">— ETog</span>
          </h1>
        </div>
        
        <p className="main-content__description">
          Платформа для поиска и создания мероприятий. 
          Находите мероприятия по интересам или создавайте собственные встречи — всё в одном месте. Присоединяйтесь к тысячам организаторов и участников.
        </p>
      </div>
    </div>
  );
};