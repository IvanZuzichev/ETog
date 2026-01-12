import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useBlacklist } from '../../../hooks/useBlackList';
import { useVoiceRecordSearch } from '../../../hooks/useVoiceRecordSearch';
import './InputField.scss';

interface InputFieldProps {
  onSearch?: (searchText: string) => void;
  onVoiceSearch?: (transcript: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export const InputField: FC<InputFieldProps> = ({ onSearch, onVoiceSearch, size = 'medium' }) => {
  const [searchText, setSearchText] = useState('');
  const { validateInput } = useBlacklist();

  // Используем хук голосового поиска
  const { isListening, transcript, startListening, stopListening, error, resetTranscript } = useVoiceRecordSearch();

  // Синхронизируем транскрипцию с полем ввода
  useEffect(() => {
    if (transcript) {
      setSearchText(transcript);
      // Можно автоматически вызывать onVoiceSearch при получении текста
      if (onVoiceSearch) {
        onVoiceSearch(transcript);
      }
    }
  }, [transcript, onVoiceSearch]);

  const containsBlacklistedWords = validateInput(searchText).containsBlacklistedWords;
  const isButtonDisabled = containsBlacklistedWords || !searchText.trim();

  const handleButtonClick = () => {
    if (isButtonDisabled) return;
    onSearch?.(searchText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 120) {
      setSearchText(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isButtonDisabled) {
      handleButtonClick();
    }
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript(); // Очищаем предыдущую транскрипцию при новом запуске
      startListening();
    }
  };

  return (
    <div className={`input-field input-field--${size}`}>
      <div className='input-field__wrapper'>
        <input
          type='text'
          placeholder='Поиск мероприятия для себя...'
          className='input-field__input'
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {/* Кнопка микрофона с индикацией записи */}
        <button
          className={`input-field__voice-button ${isListening ? 'input-field__voice-button--listening' : ''}`}
          onClick={handleVoiceSearch}
          type='button'
          aria-label={isListening ? 'Остановить запись' : 'Начать голосовой поиск'}
          title={isListening ? 'Остановить запись' : 'Начать голосовой поиск'}
        >
          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor' className='input-field__voice-icon'>
            <path d='M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z' />
            <path d='M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z' />
          </svg>
        </button>

        {/* Индикатор ошибки (можно сделать toast или другой UI) */}
        {error && (
          <div
            className='input-field__error'
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '0.5rem',
              fontSize: '0.8rem',
              borderRadius: '0 0 4px 4px',
              zIndex: 10,
            }}
          >
            {error}
          </div>
        )}
      </div>

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
