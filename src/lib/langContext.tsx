'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'ro' | 'en';

const translations = {
  ro: {
    appName: 'LegalAct',
    tagline: 'Tehnoredactare complet automată a actelor juridice conform normelor oficiale. Alegeți tipul de act pentru a începe.',
    generate: 'Generează',
    back: 'Înapoi',
    download: 'Descarcă Documentul',
    generating: 'Generează...',
    success: 'generat cu succes!',
    error: 'Eroare la generarea documentului',
    formatLabel: 'Format export',
    formatHint: 'Alegeți formatul fișierului descărcat',
    fillForm: 'Completați câmpurile de mai jos pentru a genera automat un document respectând formatul impus.',
    langToggle: 'EN',
  },
  en: {
    appName: 'LegalAct',
    tagline: 'Fully automated legal document typesetting according to official formatting standards. Choose a document type to begin.',
    generate: 'Generate',
    back: 'Back',
    download: 'Download Document',
    generating: 'Generating...',
    success: 'generated successfully!',
    error: 'Error generating document',
    formatLabel: 'Export format',
    formatHint: 'Choose the format of the downloaded file',
    fillForm: 'Fill in the fields below to automatically generate a properly formatted document.',
    langToggle: 'RO',
  },
};

interface LangContextType {
  lang: Lang;
  t: typeof translations['ro'];
  toggle: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'ro',
  t: translations['ro'],
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ro');
  const toggle = () => setLang(l => l === 'ro' ? 'en' : 'ro');
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
