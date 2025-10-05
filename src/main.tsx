import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/App';
import { ThemeProvider } from './providers/ThemeProvider';
import { registerSW } from './utils/pwaRegistration';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

registerSW();
