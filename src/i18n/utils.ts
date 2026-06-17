import siteContent from '../content/site.json';

export const locales = ['el', 'en', 'de'] as const;

export function getStaticPaths() {
  return locales.filter((l) => l !== 'el').map((locale) => ({ params: { locale } }));
}

export function useTranslations(locale: string, data?: Record<string, unknown>) {
  const site = (siteContent as Record<string, Record<string, unknown>>)[locale];

  const t = <T = unknown>(key: string): T => {
    if (data) {
      const value = key.split('.').reduce<unknown>((obj, k) => {
        if (obj && typeof obj === 'object' && k in obj) return (obj as Record<string, unknown>)[k];
        return undefined;
      }, data);
      if (value !== undefined) return value as T;
    }

    const value = key.split('.').reduce<unknown>((obj, k) => {
      if (obj && typeof obj === 'object' && k in obj) return (obj as Record<string, unknown>)[k];
      return undefined;
    }, site);
    return (value as T) ?? (key as T);
  };
  return { t };
}

export function localizedPath(path: string, locale: string): string {
  if (locale === 'el') return path;
  return `/${locale}${path}`;
}
