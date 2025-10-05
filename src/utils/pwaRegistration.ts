export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);

          // Проверяем обновления каждые 24 часа
          setInterval(
            () => {
              registration.update();
            },
            24 * 60 * 60 * 1000
          );
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export const unregisterSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
};
