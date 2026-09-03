import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { getLocale } from '@/utils/get-locale';
import { getDictionary } from '@/utils/dictionaries';
import LanguageHandler from '@/components/language-handler';
import Icon from '@/components/icons/icon';
import data from '@/models/data.json';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getLocale();
  const dict = await getDictionary(locale);

  return { ...dict.metadata, manifest: '/manifest.json' };
}

export const viewport: Viewport = {
  themeColor: '#232323',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  colorScheme: 'dark',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, needsCookie } = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={GeistSans.className}>
        <main id="top" tabIndex={-1}>
          <LanguageHandler locale={locale} needsCookie={needsCookie} labels={dict.languageHandler}
            icon={<Icon iconData={data.language} fill reduce />} />
          {children}
        </main>
      </body>
    </html>
  );
}
