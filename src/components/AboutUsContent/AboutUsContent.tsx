import React from 'react';
import './AboutUsContent.scss';
import { useNavigate } from 'react-router-dom';
import { useThemeApply } from '../../hooks/useThemeApply';
import logoETOG from '../../assets/logo/Logo-Normal.png';
import logoZION from '../../assets/LogoZION/Logo-Image.png';
// Компонент отображающей содержимое страницы "О нас"
export const AboutUsContent: React.FC = () => {
  useThemeApply();
  const navigate = useNavigate();
  // Переход на главную старницу по нажатию на логотип ETog
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='work-container'>
      <div className='work-title'>
        <p>О нашем проекте</p>
      </div>
      {/* Блок кода с компанией ZION */}
      <div className='work-ZION'>
        <div className='image-section'>
          <img src={logoZION} alt='ZION' className='profile-image' />
          <p className='work-photo-footer'>ZION</p>
        </div>
        <div className='description-section'>
          <p className='work-photo-description'>
            Команда разработчиков ZION — это сплоченная тройка специалистов, объединившихся в августе 2024 года для
            создания инновационных проектов. Каждый участник команды обладает уникальной экспертизой и автономно
            отвечает за свой сегмент работы: fullstack-разработку, проектирование архитектуры и пользовательских
            интерфейсов, а также интеграцию внешних сервисов и безопасность. Несмотря на разделение зон ответственности,
            мы работаем как единый механизм, где взаимодополняемость навыков и общее видение позволяют эффективно
            реализовывать сложные задачи, такие как платформа для мероприятий ETog. Наш подход сочетает
            agile-методологии с глубокой личной вовлеченностью каждого члена команды в успех проекта.
          </p>
        </div>
      </div>
      {/* Блок кода с проектом ETog */}
      <div className='work-ETog'>
        <div className='description-section'>
          <p className='work-photo-description'>
            ETog (Events Together) — это онлайн-платформа для создания, поиска и участия в мероприятиях, разработка
            которой стартовала в августе 2025 года. Проект создан для объединения единомышленников и способствует новым
            знакомствам через совместное времяпрепровождение. Сервис позволяет пользователям выступать в роли
            организаторов: создавать события с детальным описанием, загружать обложки и управлять списком участников.
            Участники могут регистрироваться на мероприятия, добавлять их в «избранное», подписываться на организаторов
            и получать персонализированные рекомендации. Платформа обеспечивает взаимодействие между пользователями
            через систему уведомлений и напоминаний, а вся деятельность регулируется пользовательским соглашением и
            политикой конфиденциальности.
          </p>
        </div>
        <div className='image-section'>
          <img src={logoETOG} alt='ETOG' className='profile-image' onClick={handleGoHome} />
          <p className='work-photo-footer'>ETog — Events Together</p>
        </div>
      </div>
    </div>
  );
};
