import { NextResponse } from 'next/server';
import { isLocale, localeCookieMaxAge, localeCookieName } from '@/utils/locale';

export async function POST(request: Request) {
  let locale: unknown;
  try {
    locale = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!isLocale(locale)) {
    return NextResponse.json({ error: 'Unsupported locale' }, { status: 400 });
  }

  try {
    const response = NextResponse.json({ locale }, { headers: { 'Cache-Control': 'no-store' } });
    response.cookies.set(localeCookieName, locale, {
      maxAge: localeCookieMaxAge,
      path: '/',
      sameSite: 'lax',
      secure: new URL(request.url).protocol === 'https:' || request.headers.get('x-forwarded-proto')?.split(',')[0].trim() === 'https',
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Unable to save locale' }, { status: 500 });
  }
}
