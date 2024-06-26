import { headers, cookies } from "next/headers";
import { LocaleType } from "./dictionaries";

export const locales: string[] = ['en', 'es']
export const defaultLocale: LocaleType = 'en';

interface LocaleInterface {
    lang: { locale: LocaleType, cookie: LocaleType | undefined },
    flag: LocaleType
}

export default async function getLocale(): Promise<LocaleInterface> {
    
    // Get cookie language
    const cookieLang = cookies().get('lang')?.value
    if (cookieLang !== undefined && typeof cookieLang === 'string' && locales.includes(cookieLang))
        return {
            lang: { locale: cookieLang as LocaleType, cookie: cookieLang as LocaleType },
            flag: cookieLang as LocaleType
        }

    //Get browser language
    const acceptLanguage = headers().get('accept-language');
    if (acceptLanguage === null || acceptLanguage === undefined)
        return {
            lang: { locale: defaultLocale as LocaleType, cookie: undefined },
            flag: defaultLocale as LocaleType
        }

    const preferredLanguages = acceptLanguage.split(',').map(lang => {
        const [baseLang] = lang.trim().split(';')[0].split('-');
        return baseLang;
    });

    for (const lang of preferredLanguages) {
        if (locales.includes(lang))
            return {
                lang: { locale: lang as LocaleType, cookie: undefined },
                flag: lang as LocaleType
            }
    }

    return {
        lang: { locale: defaultLocale as LocaleType, cookie: undefined },
        flag: defaultLocale as LocaleType
    }
}