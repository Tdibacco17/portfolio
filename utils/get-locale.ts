import 'server-only';
import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { isLocale, localeCookieName, resolveLocale } from './locale';

// Request-scoped: never share a visitor's preference through a global cache.
export const getLocale = cache(async () => {
  const cookie = (await cookies()).get(localeCookieName)?.value;
  if (isLocale(cookie)) return resolveLocale(cookie);
  return resolveLocale(cookie, (await headers()).get('accept-language'));
});
