import { Logo } from './Logo/Logo';
import { ProfileButton } from './ProfileButton/ProfileButton';
import { InputField } from './InputField/InputField';
import { CreateButton } from './CreateButton/CreateButton';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

// Компонент для Хедер (Header)
export const Header: React.FC = () => {
  const navigate = useNavigate();
  // Метод на переход на главную страницу при нажатии на логотип, вне зависимоти от нахождения пользователя
  const handleLogoClick = () => {
    navigate('/');
  };
  // Метод для отправки запроса на поиск
  const handleSearch = (searchText: string) => {
    if (searchText.trim() === '') {
      // Проверка на ошибку если вдруг поле с текстом смогли нажать, но ничего не написаои
      alert('Введите текст для поиска');
    } else {
      // Что мы ищем
      alert(`Ищем: ${searchText}`);
    }
  };

  return (
    <header className='header'>
      <div className='header__left'>
        {/* Выпадающий список слева */}
        <CreateButton size='medium' />
        {/* Логотип проекта */}
        <Logo onClick={handleLogoClick} size='medium' />
      </div>
      {/* Поле ввода значений */}
      <InputField onSearch={handleSearch} size='medium' />
      {/* Выпадающий список справа */}
      <div className='header__actions'>
        <ProfileButton showText={true} size='medium' />
      </div>
    </header>
  );
};
