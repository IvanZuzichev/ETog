import type { FC } from 'react';
import { useState } from 'react';
import { useBlacklist } from '../../../hooks/useBlackList';
import './InputField.scss';

interface InputFieldProps {
  onSearch?: (searchText: string) => void;
  size?: 'small' | 'medium' | 'large';
}
// Компонент для поля ввода поиска
export const InputField: FC<InputFieldProps> = ({ onSearch, size = 'medium' }) => {
  const [searchText, setSearchText] = useState('');
  const { validateInput } = useBlacklist();

  // Проверяем наличие запрещенных слов
  const containsBlacklistedWords = validateInput(searchText).containsBlacklistedWords;
  const isButtonDisabled = containsBlacklistedWords || !searchText.trim();

  const handleButtonClick = () => {
    if (isButtonDisabled) return;

    if (onSearch) {
      onSearch(searchText);
    }
  };
  // Проверка длины вводимого текста
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 120) {
      setSearchText(value);
    }
  };
  // Начало поиска
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isButtonDisabled) {
      handleButtonClick();
    }
  };

  return (
    <div className={`input-field input-field--${size}`}>
      <input
        type='text'
        placeholder='Поиск мероприятия для себя...'
        className='input-field__input'
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className={`input-field__button ${isButtonDisabled ? 'input-field__button--disabled' : ''}`}
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
      >
        Найти
      </button>
    </div>
  );
};
