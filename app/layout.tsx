import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import getLocale from "@/utils/getLocale";
import Navigation from "@/components/Navigation/Navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500'],
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  display: 'swap',
  style: 'normal',
  variable: '--font-inter',
  preload: true,
});

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
    <html lang="en" >
      <body className={inter.className}>
        <div id="layout" className="flex min-w-[100vw] max-w-[100vw]">
          <section className="min-w-20 max-w-20 sticky top-0 h-[100vh] bg-slate-600">
            <Navigation localeLang={lang.locale} cookieLang={lang.cookie} />
          </section>
          <main className="flex justify-center w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
