import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import getLocale from "@/utils/getLocale";
import LanguageHandler from "@/components/LanguageHandler/LanguageHandler";
import { getUserAgent } from "@/utils/getUserAgent";
import { headers } from "next/headers";

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
  const { isMobile } = await getUserAgent(headers().get('user-agent'));

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <main>
          <LanguageHandler localeLang={lang.locale} cookieLang={lang.cookie} isMobile={isMobile} />
          {children}
        </main>
      </body>
    </html>
  );
}
