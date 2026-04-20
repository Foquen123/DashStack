import { useEffect, useState } from 'react';
import i18n from '../i18n/i18n';

interface MonthsOption {
  title: string;
  value: string;
}

const getLocalizedMonths = (locale: string): MonthsOption[] => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' });
  const months = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1);
    months.push({
      value: String(i + 1).padStart(2, '0'),
      title: formatter.format(date),
    });
  }

  return months;
};

export const useLocalizedMonths = (): MonthsOption[] => {
  const [months, setMonths] = useState<MonthsOption[]>(
    getLocalizedMonths(i18n.language),
  );
  useEffect(() => {
    const handleLanguageChanged = () => {
      setMonths(getLocalizedMonths(i18n.language));
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);
  return months;
};
