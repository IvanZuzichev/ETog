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
    <div className='about-us-container'>
      <div className='about-us-content'>
        <div className='about-us-header'>
          <h1 className='about-us-title'>О нашем проекте</h1>
          <p className='about-us-subtitle'>
            Узнайте о команде, стоящей за платформой, и философии нашего проекта
          </p>
        </div>
        {/* Блок кода с проектом ETog */}
        <div className='about-us-card about-us-card--etog'>
          <div className='about-us-card__content'>
            <h2 className='about-us-card__title'>Платформа ETog</h2>
            <p className='about-us-card__description'>
              ETog (Events Together) — это онлайн-платформа для создания, поиска и участия в мероприятиях, 
              разработка которой стартовала в августе 2025 года. Проект создан для объединения единомышленников 
              и способствует новым знакомствам через совместное времяпрепровождение.
            </p>
            <p className='about-us-card__description'>
              Сервис позволяет пользователям выступать в роли организаторов: создавать события с детальным описанием, 
              загружать обложки и управлять списком участников. Участники могут регистрироваться на мероприятия, 
              добавлять их в «избранное», подписываться на организаторов и получать персонализированные рекомендации.
            </p>
            <p className='about-us-card__description'>
              Платформа обеспечивает взаимодействие между пользователями через систему уведомлений и напоминаний, 
              а вся деятельность регулируется пользовательским соглашением и политикой конфиденциальности.
            </p>
            <p className='about-us-card__description'>
              Прислать идею по улучшению нашего проекта можно на почту: _events_together@yandex.ru
            </p>
          </div>
          <div className='about-us-card__image'>
            <img 
              src={logoETOG} 
              alt='Логотип ETog' 
              className='about-us-card__logo about-us-card__logo--clickable'
              onClick={handleGoHome}
            />
            <p className='about-us-card__label'>ETog — Events Together</p>
          </div>
        </div>

        {/* Блок кода с компанией ZION */}
        <div className='about-us-card about-us-card--zion'>
          <div className='about-us-card__image'>
            <img src={logoZION} alt='Логотип ZION' className='about-us-card__logo' />
            <p className='about-us-card__label'>ZION</p>
          </div>
          <div className='about-us-card__content'>
            <h2 className='about-us-card__title'>Команда разработчиков</h2>
            <p className='about-us-card__description'>
              Команда разработчиков ZION — это сплоченная тройка специалистов, объединившихся в августе 2024 года 
              для создания инновационных проектов. Каждый участник команды обладает уникальной экспертизой и автономно 
              отвечает за свой сегмент работы: fullstack-разработку, проектирование архитектуры и пользовательских 
              интерфейсов, а также интеграцию внешних сервисов и безопасность.
            </p>
            <p className='about-us-card__description'>
              Несмотря на разделение зон ответственности, мы работаем как единый механизм, где взаимодополняемость 
              навыков и общее видение позволяют эффективно реализовывать сложные задачи, такие как платформа для 
              мероприятий ETog. Наш подход сочетает agile-методологии с глубокой личной вовлеченностью каждого 
              члена команды в успех проекта.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};