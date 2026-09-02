import 'server-only';
import { cache } from 'react';
import type { Locale } from './locale';
import type { Dictionary } from '@/models/dictionary';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/models/en.json').then(module => module.default),
  es: () => import('@/models/es.json').then(module => module.default),
};

export const getDictionary = cache((locale: Locale) => dictionaries[locale]());
