import { headers, cookies } from "next/headers";
import { LocaleType } from "./dictionaries";

export const locales: string[] = ['en', 'es']
export const defaultLocale: LocaleType = 'en';

export default async function getLocale(): Promise<LocaleType> {
    // Get cookie language
    const cookieLang = cookies().get('lang')?.value
    if (cookieLang !== undefined && typeof cookieLang === 'string' && locales.includes(cookieLang)) return cookieLang as LocaleType

    //Get browser language
    const acceptLanguage = headers().get('accept-language');
    if (acceptLanguage === null || acceptLanguage === undefined) return defaultLocale;

    const preferredLanguages = acceptLanguage.split(',').map(lang => {
        const [baseLang] = lang.trim().split(';')[0].split('-');
        return baseLang;
    });

    for (const lang of preferredLanguages) {
        if (locales.includes(lang)) return lang as LocaleType;
    }

    return defaultLocale as LocaleType;
}