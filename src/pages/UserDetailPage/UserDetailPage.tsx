import React from 'react';
import './UserDetailPage.scss';
import { useGlobalAvatar } from '../../hooks/useGlobalAvatar';
import { 
  ACCOUNT_STATUS, 
  STATUS_CONFIG 
} from '../../store/constants/accountStatus';
import AccountPhoto from '../../assets/Photo/User.png';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import EventSection from '../../components/EventSection/EventSection';
import { ButtonsEventsUser } from '../../components/ButtonsEventsUser/ButtonsEventsUser';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

interface UserDetailPageData {
  login: string;
  email: string;
  description: string;
  accountStatus?: string;
  rating?: number; // рейтинг от 0 до 5
  reviewCount?: number; // количество отзывов
  userId?: string; // ID пользователя для ссылки
  avatarUrl?: string; // URL аватарки пользователя (если есть)
}

interface UserDetailPageProps {
  userData: UserDetailPageData;
  className?: string;
  isSubscribed?: boolean;
  onSubscribe?: () => void;
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ 
  userData, 
  className = '',
  isSubscribed = false,
  onSubscribe
}) => {
  const { avatar } = useGlobalAvatar();

  const statusConfig = STATUS_CONFIG[userData.accountStatus as keyof typeof STATUS_CONFIG] || STATUS_CONFIG[ACCOUNT_STATUS.UNVERIFIED];

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/user/${userData.userId}`;
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        alert(`Ссылка на профиль скопирована в буфер обмена:\n${profileUrl}`);
      })
      .catch(() => {
        alert('Не удалось скопировать ссылку. Скопируйте вручную:\n' + profileUrl);
      });
  };

  const handleSubscribeClick = () => {
    if (onSubscribe) {
      onSubscribe();
      
    } else {
      const action = isSubscribed ? 'отписаться от' : 'подписаться на';
      alert(`Вы ${action} пользователя ${userData.login}`);
    }
  };

  const renderStars = () => {
    return '★★★★★'; // Все звезды заполненные, как в EventDetailPage
  };

    // Используем хук useDocumentTitle на верхнем уровне
    useDocumentTitle(userData ? `${userData.login} | Events Together — ETog` : 'Загрузка мероприятия | Events Together — ETog');

  return (
    <>
    <Header/>
    <div className="header-spacer"></div>
    <div className='main-page-wrapper'>
      <div className='account-section'>
        <div className={`userprofile-container ${className}`}>
          <div className='profile-header'>
            <h1 className='profile-title'>Профиль пользователя</h1>
          </div>

          <div className='profile-content'>
            <div className='profile-left'>
              <div className='profile-photo-container'>
                {/* Аватарка (только просмотр) */}
                <div className='profile-photo'>
                  <img 
                    src={userData.avatarUrl || avatar || AccountPhoto} 
                    alt={`Аватар ${userData.login}`} 
                    className='profile-image' 
                  />
                </div>
                
                {/* Рейтинг и отзывы */}
                <div className='rating-section'>
                  <div className='stars-container'>
                    <span className='stars' title={`Рейтинг: ${(userData.rating || 0).toFixed(1)} из 5`}>
                      {renderStars()}
                    </span>
                    <span className='rating-text'>{(userData.rating || 0).toFixed(1)}</span>
                  </div>
                  <div className='reviews-count' title={`Количество отзывов: ${userData.reviewCount || 0}`}>
                    {userData.reviewCount || 0} {userData.reviewCount === 1 ? 'отзыв' : (userData.reviewCount || 0) >= 2 && (userData.reviewCount || 0) <= 4 ? 'отзыва' : 'отзывов'}
                  </div>
                </div>

                {/* Статус аккаунта */}
                <div 
                  className='account-status' 
                  style={{ color: statusConfig.color }}
                  title={statusConfig.description}
                >
                  {statusConfig.label}
                </div>
              </div>
            </div>

            <div className='profile-right'>
              <div className='userprofile-form'>
                <div className='two-column-layout'>
                  {/* Левая колонка: Логин и Email */}
                  <div className='left-column'>
                    <div className='form-field'>
                      <label className='form-label'>
                        Логин
                      </label>
                      <div className='user-info-value'>
                        {userData.login}
                      </div>
                    </div>

                    <div className='form-field'>
                      <label className='form-label'>
                        Адрес электронной почты
                      </label>
                      <div className='user-info-value'>
                        {userData.email}
                      </div>
                    </div>
                  </div>

                  {/* Правая колонка: Описание и кнопки */}
                  <div className='right-column'>
                    <div className='form-field'>
                      <label className='form-label'>
                        Описание профиля
                      </label>
                      <div className='description-value'>
                        {userData.description || 'Пользователь не добавил описание'}
                      </div>
                    </div>

                    <div className='profile-actions'>
                      <button 
                        type='button'
                        className={`subscribe-button ${isSubscribed ? 'subscribe-button--subscribed' : ''}`}
                        onClick={handleSubscribeClick}
                      >
                        {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
                      </button>
                      
                      <button 
                        type='button'
                        className='share-button'
                        onClick={handleShareProfile}
                      >
                        Поделиться профилем
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ButtonsEventsUser/>
    <EventSection/>
    <Footer/>
    </>
  );
};

export default UserDetailPage;