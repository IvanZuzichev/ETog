import React from 'react';
import './Code404Content.scss';
import { useNavigate } from 'react-router-dom'; 
import { useThemeApply } from '../../hooks/useThemeApply';
export const Code404Content: React.FC = () => {
      useThemeApply();
    
      const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Извините, такой страницы еще нет! Вы опередили нас! Пока мы работаем над ее созданием, воспользуйтесь меню выбора или перейдите на главную страницу.
        </p>
        <button 
          className="not-found-button"
          onClick={handleGoHome}
        >
          Перейдите на главную страницу
        </button>
      </div>
    </div>
  );
};