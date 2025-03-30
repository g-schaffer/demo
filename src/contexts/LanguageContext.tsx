import { createContext } from 'react';

interface LanguageContextType {
  language: 'fr' | 'en';
  setLanguage: (language: 'fr' | 'en') => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
});