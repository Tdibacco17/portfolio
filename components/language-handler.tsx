'use client';

import { useEffect, useId, useRef, useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { Dictionary } from '@/models/dictionary';
import type { Locale } from '@/utils/locale';
import { setLocale } from '@/utils/set-locale';

export default function LanguageHandler({ locale, needsCookie, labels, icon }: {
  locale: Locale;
  needsCookie: boolean;
  labels: Dictionary['languageHandler'];
  icon: ReactNode;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(needsCookie);
  const [changingLanguage, setChangingLanguage] = useState(false);
  const [error, setError] = useState(false);
  const [changed, setChanged] = useState(false);
  const [refreshing, startTransition] = useTransition();
  const initialization = useRef<Promise<void> | null>(null);
  const changing = useRef(false);
  const requestedLocale = useRef<Locale | null>(null);
  const messageId = useId();

  useEffect(() => {
    if (!needsCookie) return;
    let active = true;
    // Reuse the same write across Strict Mode effects. Manual changes wait for it.
    initialization.current ??= setLocale(locale);
    initialization.current.catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [locale, needsCookie]);

  useEffect(() => {
    if (!changingLanguage || refreshing || requestedLocale.current !== locale) return;
    requestedLocale.current = null;
    setChangingLanguage(false);
    setBusy(false);
    setChanged(true);
    changing.current = false;
  }, [changingLanguage, locale, refreshing]);

  async function changeLanguage() {
    if (changing.current || busy || refreshing) return;
    changing.current = true;
    setBusy(true);
    setChangingLanguage(true);
    setError(false);
    setChanged(false);
    try {
      await initialization.current?.catch(() => {});
      const nextLocale = locale === 'en' ? 'es' : 'en';
      await setLocale(nextLocale);
      requestedLocale.current = nextLocale;
      startTransition(() => router.refresh());
    } catch {
      requestedLocale.current = null;
      setError(true);
      setChangingLanguage(false);
      setBusy(false);
      changing.current = false;
    }
  }

  return (
    <div className="absolute right-0 sm:-top-3 -top-12">
      <button type="button" onClick={changeLanguage} disabled={busy || refreshing} aria-busy={busy || refreshing}
        aria-label={labels.switchLabel} aria-describedby={error ? messageId : undefined}
        className="language-button text-base flex gap-2 items-center uppercase rounded-custom p-3 text-lightPrimary hover:bg-darkPrimaryHover hover:text-white [&_path]:fill-softHover hover:[&_path]:fill-white [@media(hover:none)]:text-white [@media(hover:none)]:bg-darkPrimaryHover [@media(hover:none)]:[&_path]:fill-white cursor-pointer disabled:cursor-wait">
        {locale}
        <span className="flex h-5 w-5 items-center justify-center" aria-hidden="true">
          {changingLanguage
            ? <span data-language-loading className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-soft border-t-white motion-reduce:animate-none" />
            : icon}
        </span>
      </button>
      <p id={messageId} role="status" aria-atomic="true"
        className={error ? 'absolute top-full right-0 mt-2 w-64 text-sm text-lightPrimary' : 'sr-only'}>
        {error ? labels.error : changed && !busy && !refreshing ? labels.changed : ''}
      </p>
    </div>
  );
}
