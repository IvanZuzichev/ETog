import { useState, useRef, useCallback } from 'react';

interface UseVoiceRecordSearchReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  resetTranscript: () => void;
}

export const useVoiceRecordSearch = (): UseVoiceRecordSearchReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const fullTranscriptRef = useRef('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    fullTranscriptRef.current = '';
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsListening(false);
  }, []);

  const restartListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log('Перезапуск распознавания после паузы...');
      recognitionRef.current.stop();
      setTimeout(() => {
        if (isListening && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.log('Ошибка при перезапуске:', e);
          }
        }
      }, 100);
    }
  }, [isListening]);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Ваш браузер не поддерживает голосовой ввод');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Настройки для увеличения времени паузы
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ru-RU';

    // Пытаемся установить более длинную паузу (работает в некоторых браузерах)
    if ('webkitSpeechRecognition' in window) {
      try {
        (recognition as any).maxAlternatives = 1;
      } catch (e) {
        console.log('Не удалось установить дополнительные настройки');
      }
    }

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);

      if (
        fullTranscriptRef.current &&
        !fullTranscriptRef.current.endsWith('. ') &&
        !fullTranscriptRef.current.endsWith('! ') &&
        !fullTranscriptRef.current.endsWith('? ')
      ) {
        fullTranscriptRef.current += '. ';
      }

      setTranscript(fullTranscriptRef.current);
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      let hasFinalResult = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          let finalTranscript = transcriptPart;

          if (!finalTranscript.endsWith('.') && !finalTranscript.endsWith('!') && !finalTranscript.endsWith('?')) {
            finalTranscript += '.';
          }

          fullTranscriptRef.current += finalTranscript + ' ';
          currentTranscript = '';
          hasFinalResult = true;
        } else {
          currentTranscript = transcriptPart;
        }
      }

      setTranscript(fullTranscriptRef.current + currentTranscript);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Устанавливаем таймер на 3 секунды после последнего результата
      if (hasFinalResult) {
        timeoutRef.current = setTimeout(() => {
          console.log('3 секунды без речи - перезапуск');
          restartListening();
        }, 3000);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Ошибка распознавания:', event.error);

      // Игнорируем ошибку "no-speech", так как это нормально при паузах
      if (event.error !== 'no-speech') {
        setError(`Ошибка распознавания: ${event.error}`);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log('Распознавание завершено');

      // Автоматически перезапускаем, если это не было ручное остановление
      if (isListening) {
        console.log('Автоперезапуск распознавания...');
        setTimeout(() => {
          if (isListening && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.log('Ошибка при перезапуске:', e);
              setIsListening(false);
            }
          }
        }, 100);
      } else {
        setIsListening(false);
      }
    };

    // Дополнительные обработчики для лучшего контроля
    recognition.onsoundstart = () => {
      console.log('Обнаружен звук');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    recognition.onsoundend = () => {
      console.log('Звук закончился');
      // Увеличиваем время ожидания после окончания звука
      timeoutRef.current = setTimeout(() => {
        if (isListening) {
          restartListening();
        }
      }, 3000);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      console.error('Ошибка при запуске распознавания:', e);
      setError('Не удалось запустить распознавание голоса');
    }
  }, [isListening, restartListening]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    resetTranscript,
  };
};
