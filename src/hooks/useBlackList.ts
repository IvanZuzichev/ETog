import { blackWords } from '../store/blackWords/blackWords';

// Хук для проверки всез полей на сайте, куда можно ввести текст, чтобы не было матов и плохих слов
export const useBlacklist = () => {
  const checkForBlacklistedWords = (text: string): boolean => {
    if (!text.trim()) return false;

    const normalizedText = text.toLowerCase().trim();

    return blackWords.some(blackWord => normalizedText.includes(blackWord.toLowerCase()));
  };

  const filterBlacklistedWords = (text: string): string => {
    if (!text.trim()) return text;

    let filteredText = text;

    blackWords.forEach(blackWord => {
      const regex = new RegExp(blackWord, 'gi');
      filteredText = filteredText.replace(regex, '*'.repeat(blackWord.length));
    });

    return filteredText;
  };

  const validateInput = (
    text: string
  ): {
    isValid: boolean;
    filteredText: string;
    containsBlacklistedWords: boolean;
  } => {
    const containsBlacklisted = checkForBlacklistedWords(text);
    const filteredText = containsBlacklisted ? filterBlacklistedWords(text) : text;

    return {
      isValid: !containsBlacklisted,
      filteredText,
      containsBlacklistedWords: containsBlacklisted,
    };
  };

  return {
    checkForBlacklistedWords,
    filterBlacklistedWords,
    validateInput,
  };
};
