import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import getLocale from "@/utils/getLocale";
import LanguageHandler from "@/components/LanguageHandler/LanguageHandler";

export const metadata: Metadata = {
  title: "Tomás Di Bacco",
  description: "Portfolio",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  themeColor: '#232323',
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,
  userScalable: true,
  colorScheme: 'dark',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = await getLocale();

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <main>
          <LanguageHandler localeLang={lang.locale} cookieLang={lang.cookie} />
          {children}
        </main>
      </body>
    </html>
  );
}
