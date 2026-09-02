import { describe, expect, it } from 'vitest';
import { isLocale, resolveLocale } from '@/utils/locale';

describe('locale negotiation', () => {
  it.each(['en', 'es'])('keeps a valid %s cookie ahead of the browser', cookie => {
    expect(resolveLocale(cookie, cookie === 'en' ? 'es' : 'en')).toEqual({ locale: cookie, needsCookie: false });
  });

  it.each([
    [undefined, 'es'], [null, 'es'], ['', 'es'], ['fr-FR,de;q=0.8', 'es'], ['*', 'es'],
    ['en-US,en;q=0.9,es;q=0.8', 'en'], ['ES-ar', 'es'], ['EN-gb', 'en'],
    ['es;q=0.2,en;q=0.9', 'en'], ['en;q=0.2,es;q=0.9', 'es'],
    ['en;q=0.8,es;q=0.8', 'en'], ['es;q=0.8,en;q=0.8', 'es'],
    ['en;q=0,es;q=0.5', 'es'], ['es;q=0,en', 'en'], ['en;q=0,fr', 'es'],
    ['en;q=bogus,es', 'es'], ['en;q=2,es', 'es'], ['en;q=-1,es', 'es'],
    ['es;q=0.3333,en', 'en'], ['en;q=1.001,es', 'es'], ['es;anything,en', 'en'],
    ['en;q=0.9;q=0.8,es', 'es'], ['en-;q=1,es', 'es'],
    ['fr;q=1, en-US ; q=0.500, es;q=0.2', 'en'],
  ])('negotiates %s as %s', (header, locale) => {
    expect(resolveLocale(undefined, header)).toEqual({ locale, needsCookie: true });
  });

  it.each(['', 'fr', 'ES', 'en-US', 'undefined'])('replaces an invalid cookie (%s)', cookie => {
    expect(resolveLocale(cookie, 'en-US')).toEqual({ locale: 'en', needsCookie: true });
  });

  it('treats an expired cookie, absent from the request, as a new visit', () => {
    expect(resolveLocale(undefined, 'es-AR')).toEqual({ locale: 'es', needsCookie: true });
  });

  it.each([null, 1, {}, ['es'], 'en-US', 'ES'])('rejects non-canonical API locales: %j', value => {
    expect(isLocale(value)).toBe(false);
  });
});
