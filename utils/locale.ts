export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';
export const localeCookieName = 'lang';
export const localeCookieMaxAge = 30 * 24 * 60 * 60;

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'es';
}

export function resolveLocale(cookieValue?: string, acceptLanguage?: string | null) {
  if (isLocale(cookieValue)) return { locale: cookieValue, needsCookie: false };

  const preferences = (acceptLanguage ?? '').split(',').flatMap((entry, index) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(';').map(part => part.trim());
    if (!/^[a-z]{2,8}(?:-[a-z0-9]{1,8})*$/.test(tag) || parameters.length > 1) return [];
    const parameter = parameters[0];
    if (parameter !== undefined && !/^q=(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(parameter)) return [];
    const quality = parameter === undefined ? 1 : Number(parameter.slice(2));
    const language = tag.split('-')[0];
    return quality > 0 && isLocale(language) ? [{ language, quality, index }] : [];
  });

  preferences.sort((a, b) => b.quality - a.quality || a.index - b.index);
  return { locale: preferences[0]?.language ?? defaultLocale, needsCookie: true };
}
