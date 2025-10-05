import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import './App.scss';
import MainPage from '../pages/MainPage/MainPage';
import CookieContent from '../components/CookieContent/CookieContent';
import { usePreload } from '../hooks/usePreload';

// Ленивая загрузка с предзагрузкой
const CreateEventPage = lazy(() => import('../pages/CreateEventPage/CreateEventPage'));
const FavoriteEventsPage = lazy(() => import('../pages/FavoriteEventsPage/FavoriteEventsPage'));
const RecommendationEventsPage = lazy(() => import('../pages/RecommendationEventsPage/RecommendationEventsPage'));
const SubscribersPage = lazy(() => import('../pages/SubscribersPage/SubscribersPage'));
const ConfigurationPage = lazy(() => import('../pages/ConfigurationPage/ConfigurationPage'));
const ContactUsPage = lazy(() => import('../pages/ContactUsPage/ContactUsPage'));
const SupportPage = lazy(() => import('../pages/SupportPage/SupportPage'));
const AboutUsPage = lazy(() => import('../pages/AboutUsPage/AboutUsPage'));
const LegalDocumentsPage = lazy(() => import('../pages/LegalDocumentsPage/LegalDocumentsPage'));
const MyAccountPage = lazy(() => import('../pages/MyAccountPage/MyAccountPage'));
const AccountPage = lazy(() => import('../pages/AccountPage/AccountPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const AuthorizationPage = lazy(() => import('../pages/AuthorizationPage/AuthorizationPage'));
const SendMessagePage = lazy(() => import('../pages/SendMessagePage/SendMessagePage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage/ResetPasswordPage'));
const DetailsEventPage = lazy(() => import('../pages/DetailsEventPage/DetailsEventPage'));
const Code404Page = lazy(() => import('../pages/Code404Page/Code404Page'));

// Маршрутизация веб-сервиса
function App() {
  const { preloadPages } = usePreload();

  useEffect(() => {
    // Предзагружаем страницы через 1 секунду после загрузки приложения
    const timer = setTimeout(preloadPages, 1000);
    return () => clearTimeout(timer);
  }, [preloadPages]);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='/CreateEvent' element={<CreateEventPage />} />
          <Route path='/FavoriteEvents' element={<FavoriteEventsPage />} />
          <Route path='/RecommendationEvents' element={<RecommendationEventsPage />} />
          <Route path='/Subscribers' element={<SubscribersPage />} />
          <Route path='/Configuration' element={<ConfigurationPage />} />
          <Route path='/ContactUs' element={<ContactUsPage />} />
          <Route path='/Support' element={<SupportPage />} />
          <Route path='/AboutUs' element={<AboutUsPage />} />
          <Route path='/LegalDocuments' element={<LegalDocumentsPage />} />
          <Route path='/MyAccount' element={<MyAccountPage />} />
          <Route path='/Account' element={<AccountPage />} /> {/* Сделать jwt-токен блокировку */}
          <Route path='/Registration' element={<RegistrationPage />} />
          <Route path='/Authorization' element={<AuthorizationPage />} />
          <Route path='/SendMessage' element={<SendMessagePage />} />
          <Route path='/ResetPassword' element={<ResetPasswordPage />} />{' '}
          {/* Сделать Дополнительную блокировку, пока прошлая страница не одобрит */}
          <Route path='/DetailsEvent' element={<DetailsEventPage />} />
          <Route path='*' element={<Code404Page />} />
        </Routes>
        <CookieContent />
      </Router>
    </div>
  );
}

export default App;
