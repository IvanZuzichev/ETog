import type { FC } from 'react';
import { useState } from 'react';
import { useTheme } from '../../../theme/ThemeContext';
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
  const { theme } = useTheme();

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

  const inputFieldStyle = {
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.primary}20`
  };

  const inputStyle = {
    backgroundColor: theme.colors.background,
    color: theme.colors.text
  };

  const buttonStyle = {
    backgroundColor: theme.colors.buttonBg,
    color: theme.colors.text
  };

  return (
    <div 
      className={`input-field input-field--${size}`}
      style={inputFieldStyle}
    >
      <input
        type='text'
        placeholder='Поиск мероприятия для себя...'
        className='input-field__input'
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={inputStyle}
      />
      <button 
        className='input-field__button' 
        onClick={handleButtonClick}
        style={buttonStyle}
      >
        Найти
      </button>
    </div>
  );
};