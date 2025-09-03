import type { FC } from 'react';
import { useState } from 'react';
import './InputField.css';

interface InputFieldProps {
  onSearch?: (searchText: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export const InputField: FC<InputFieldProps> = ({
  onSearch,
  size = 'medium',
}) => {
  const [searchText, setSearchText] = useState('');

  const handleButtonClick = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
      <button className='input-field__button' onClick={handleButtonClick}>
        Найти
      </button>
    </div>
  );
};
