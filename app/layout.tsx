import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Internationalization from "@/components/Internationalization/Internationalization";
import { cookies } from "next/headers";
import getLocale from "@/utils/getLocale";

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
  const langLocale = await getLocale();
  const cookieLang = cookies().get('lang')?.value;

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-[100vh] max-h-[100vh] min-w-[100vw] max-w-[100vw] overflow-hidden flex">
          <section className="min-h-[100vh] max-h-[100vh] w-20 bg-slate-600">
            <Internationalization langLocale={langLocale} cookieLang={cookieLang} />
          </section>
          <section className="min-h-[100vh] max-h-[100vh] w-full bg-red-400 flex justify-center">
            <div className="max-w-wrapper min-w-wrapper bg-blue-600 overflow-y-auto">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
