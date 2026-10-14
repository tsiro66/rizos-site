import siteContent from '../content/site.json';

export const locales = ['el', 'en', 'de'] as const;

export const pageTitles: Record<string, Record<string, string>> = {
  home: {
    el: 'Ρίζος — Αγνά & Φυσικά Προϊόντα',
    en: 'Rizos — Pure & Natural Products',
    de: 'Rizos — Reine & Natürliche Produkte',
  },
  about: {
    el: 'Σχετικά με εμάς | Ρίζος',
    en: 'About Us | Rizos',
    de: 'Über uns | Rizos',
  },
  products: {
    el: 'Προϊόντα | Ρίζος',
    en: 'Products | Rizos',
    de: 'Produkte | Rizos',
  },
  factory: {
    el: 'Εγκαταστάσεις | Ρίζος',
    en: 'Facilities | Rizos',
    de: 'Anlagen | Rizos',
  },
  contact: {
    el: 'Επικοινωνία | Ρίζος',
    en: 'Contact | Rizos',
    de: 'Kontakt | Rizos',
  },
};

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
  // Cloudflare Workers assets serves `/dir` -> 307 -> `/dir/`. Emit the
  // canonical trailing-slash form directly so no navigation pays a redirect.
  const withSlash = path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`;
  if (locale === 'el') return withSlash;
  return `/${locale}${withSlash}`;
}

/** Strip a known locale prefix from a pathname, e.g. `/en/products/` -> `/products/`. */
export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|de)(?=\/|$)/, '');
  return stripped || '/';
}

/** All locale variants of the current page, for `hreflang` alternates. */
export function alternatePaths(pathname: string): { locale: string; path: string }[] {
  const base = stripLocalePrefix(pathname);
  return locales.map((l) => ({ locale: l, path: l === 'el' ? base : `/${l}${base}` }));
}
