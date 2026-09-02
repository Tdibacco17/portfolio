import { localeCookieName, type Locale } from './locale';

export async function setLocale(locale: Locale): Promise<void> {
  const response = await fetch('/api/cookie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locale),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error('Unable to save locale');
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object' || !('locale' in result) || result.locale !== locale) {
    throw new Error('Unexpected locale response');
  }
  // Detect blocked cookies before announcing success or refreshing unchanged content.
  const saved = document.cookie.split(';').some(cookie => cookie.trim() === `${localeCookieName}=${locale}`);
  if (!saved) throw new Error('Locale cookie was not persisted');
}
