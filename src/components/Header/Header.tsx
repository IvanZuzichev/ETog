import { Logo } from './Logo/Logo';
import { ProfileButton } from './ProfileButton/ProfileButton';
import { InputField } from './InputField/InputField';
import { CreateButton } from './CreateButton/CreateButton';
import './Header.css';

export const Header = () => {
  const handleLogoClick = () => {
    alert('Event Together');
  };

  const handleSearch = (searchText: string) => {
    if (searchText.trim() === '') {
      alert('Введите текст для поиска');
    } else {
      alert(`Ищем: ${searchText}`);
    }
  };

  return (
    <header className='header'>
      <div className='header__left'>
        <CreateButton size='medium' />
        <Logo onClick={handleLogoClick} size='medium' />
      </div>

      <InputField onSearch={handleSearch} size='medium' />

      <div className='header__actions'>
        <ProfileButton showText={true} size='medium' />
      </div>
    </header>
  );
};
