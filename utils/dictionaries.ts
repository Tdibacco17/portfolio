import 'server-only'

export type LocaleType = 'es' | 'en'

const dictionaries = {
    en: () => import('@/models/en.json').then((module) => module.default),
    es: () => import('@/models/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: LocaleType) => dictionaries[locale]()