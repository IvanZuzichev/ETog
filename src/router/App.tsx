import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from '../pages/MainPage/MainPage';
import { CreateEventPage } from '../pages/CreateEventPage/CreateEventPage';
import { FavoriteEventsPage } from '../pages/FavoriteEventsPage/FavoriteEventsPage';
import { RecommendationEventsPage } from '../pages/RecommendationEventsPage/RecommendationEventsPage';
import { SubscribersPage } from '../pages/SubscribersPage/SubscribersPage';
import { ConfigurationPage } from '../pages/ConfigurationPage/ConfigurationPage';
import { ContactUsPage } from '../pages/ContactUsPage/ContactUsPage';
import { SupportPage } from '../pages/SupportPage/SupportPage';
import { AboutUsPage } from '../pages/AboutUsPage/AboutUsPage';
import { LegalDocumentsPage } from '../pages/LegalDocumentsPage/LegalDocumentsPage';
import { MyAccountPage } from '../pages/MyAccountPage/MyAccountPage';
import { AccountPage } from '../pages/AccountPage/AccountPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { AuthorizationPage } from '../pages/AuthorizationPage/AuthorizationPage';
import { SendMessagePage } from '../pages/SendMessagePage/SendMessagePage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage/ResetPasswordPage';
import { DetailsEventPage } from '../pages/DetailsEventPage/DetailsEventPage';
import { Code404Page } from '../pages/Code404Page/Code404Page';

function App() {
  return (
    <div className='app'>
      <Router>
          <Routes>
            <Route index element={<MainPage/>} />
            <Route path="/CreateEvent" element={<CreateEventPage/>} />
            <Route path="/FavoriteEvents" element={<FavoriteEventsPage/>} />
            <Route path="/RecommendationEvents" element={<RecommendationEventsPage/>} />
            <Route path="/Subscribers" element={<SubscribersPage/>} />
            <Route path="/Configuration" element={<ConfigurationPage/>} />
            <Route path="/ContactUs" element={<ContactUsPage/>} />
            <Route path="/Support" element={<SupportPage/>} />
            <Route path="/AboutUs" element={<AboutUsPage/>} />
            <Route path="/LegalDocuments" element={<LegalDocumentsPage/>} />
            <Route path="/MyAccount" element={<MyAccountPage/>} />
            <Route path="/Account" element={<AccountPage/>} />      {/* Сделать jwt-токен блокировку */}
            <Route path="/Registration" element={<RegistrationPage/>} /> 
            <Route path="/Authorization" element={<AuthorizationPage/>} /> 
            <Route path="/SendMessage" element={<SendMessagePage/>} /> 
            <Route path="/ResetPassword" element={<ResetPasswordPage/>} /> {/* Сделать Дополнительную блокировку, пока прошлая страница не одобрит */}
            <Route path="/DetailsEvent" element={<DetailsEventPage/>} />
            <Route path="*" element={<Code404Page/>} /> 
          </Routes>
      </Router>
    </div>
  );
}

export default App;
