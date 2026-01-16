// Хук для ленивой загрузки основных страниц
import { useCallback } from 'react';

export const usePreload = () => {
  const preloadPages = useCallback(() => {
    // Предзагружаем часто используемые страницы
    const pagesToPreload = [
      import('../pages/CreateEventPage/CreateEventPage'),
      import('../pages/MyAccountPage/MyAccountPage'),
      import('../pages/DetailsEventPage/DetailsEventPage'),
      import('../pages/FavoriteEventsPage/FavoriteEventsPage'),
      import('../pages/RecommendationEventsPage/RecommendationEventsPage'),
    ];

    // Запускаем предзагрузку
    Promise.allSettled(pagesToPreload);
  }, []);

  // Предзагрузка при наведении на ссылку
  const preloadOnHover = useCallback((pagePath: string) => {
    switch (pagePath) {
      case '/CreateEvent':
        import('../pages/CreateEventPage/CreateEventPage');
        break;
      case '/MyAccount':
        import('../pages/MyAccountPage/MyAccountPage');
        break;
      case '/DetailsEvent':
        import('../pages/DetailsEventPage/DetailsEventPage');
        break;
      case '/FavoriteEvents':
        import('../pages/FavoriteEventsPage/FavoriteEventsPage');
        break;
      case '/RecommendationEvents':
        import('../pages/RecommendationEventsPage/RecommendationEventsPage');
        break;
      case '/Support':
        import('../pages/SupportPage/SupportPage');
        break;
      default:
        // Для остальных страниц не предзагружаем
        break;
    }
  }, []);

  return { preloadPages, preloadOnHover };
};
