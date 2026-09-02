import { describe, expect, it } from 'vitest';
import { POST } from '@/app/api/cookie/route';

const request = (value: unknown, url = 'http://localhost/api/cookie', headers = {}) => new Request(url, {
  method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(value),
});

describe('locale cookie endpoint', () => {
  it.each(['en', 'es'])('sets %s for exactly thirty days', async locale => {
    const response = await POST(request(locale));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ locale });
    const cookie = response.headers.get('set-cookie');
    expect(cookie).toContain(`lang=${locale};`);
    expect(cookie).toContain('Max-Age=2592000');
    expect(cookie).toContain('Path=/');
    expect(cookie).toContain('SameSite=lax');
    expect(cookie).not.toContain('Secure');
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it.each([null, 1, {}, { locale: 'es' }, ['en'], '', 'fr', 'ES', 'es-AR'])('rejects %j without setting a cookie', async value => {
    const response = await POST(request(value));
    expect(response.status).toBe(400);
    expect(response.headers.has('set-cookie')).toBe(false);
  });

  it('rejects malformed JSON', async () => {
    const response = await POST(new Request('http://localhost/api/cookie', { method: 'POST', body: '{' }));
    expect(response.status).toBe(400);
    expect(response.headers.has('set-cookie')).toBe(false);
  });

  it.each([
    ['https://example.test/api/cookie', {}],
    ['http://localhost/api/cookie', { 'x-forwarded-proto': 'https' }],
  ])('marks cookies secure under HTTPS (%s)', async (url, headers) => {
    expect((await POST(request('es', url, headers))).headers.get('set-cookie')).toContain('Secure');
  });

  it('returns a real 500 without leaking exception details', async () => {
    const brokenRequest = request('es');
    Object.defineProperty(brokenRequest, 'url', { get() { throw new Error('private details'); } });
    const response = await POST(brokenRequest);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Unable to save locale' });
    expect(response.headers.has('set-cookie')).toBe(false);
  });
});
