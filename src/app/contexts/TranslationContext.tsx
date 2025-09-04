"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>('fr');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadTranslations = async (lang: Language) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/locale/${lang}/common.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Debug log only in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Loaded translations for ${lang}:`, Object.keys(data));
      }
      setTranslations(data);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      setTranslations({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load initial language from localStorage or default to French (client-side only)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const getNestedTranslation = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  };

  const t = (key: string): string => {
    const translation = getNestedTranslation(translations, key);
    if (translation === null || translation === undefined) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation;
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
    isLoading
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}