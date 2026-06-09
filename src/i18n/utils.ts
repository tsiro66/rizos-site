import el from './el.json';
import en from './en.json';
import de from './de.json';

const translations: Record<string, Record<string, unknown>> = { el, en, de };

export const locales = ['el', 'en', 'de'] as const;

export function getStaticPaths() {
  return locales.filter((l) => l !== 'el').map((locale) => ({ params: { locale } }));
}

export function useTranslations(locale: string) {
  const t = <T = unknown>(key: string): T => {
    const value = key.split('.').reduce<unknown>((obj, k) => {
      if (obj && typeof obj === 'object' && k in obj) return (obj as Record<string, unknown>)[k];
      return undefined;
    }, translations[locale]);
    return (value as T) ?? (key as T);
  };
  return { t };
}

export function localizedPath(path: string, locale: string): string {
  if (locale === 'el') return path;
  return `/${locale}${path}`;
}
