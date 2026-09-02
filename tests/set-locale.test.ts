import { describe, expect, it, vi } from 'vitest';
import { setLocale } from '@/utils/set-locale';

describe('browser locale persistence', () => {
  it('verifies the cookie before reporting success', async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ locale: 'es' }));
    vi.stubGlobal('fetch', fetch);
    vi.stubGlobal('document', { cookie: 'other=value; lang=es' });
    await expect(setLocale('es')).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('/api/cookie', expect.objectContaining({ method: 'POST', body: '"es"' }));
  });

  it('detects blocked cookies even when the server reports success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ locale: 'es' })));
    vi.stubGlobal('document', { cookie: '' });
    await expect(setLocale('es')).rejects.toThrow('not persisted');
  });

  it.each([
    Response.json({ error: 'Failed' }, { status: 500 }),
    Response.json({ locale: 'en' }),
    Response.json(null),
    new Response('not JSON'),
  ])('rejects failed or malformed responses', async response => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));
    vi.stubGlobal('document', { cookie: 'lang=es' });
    await expect(setLocale('es')).rejects.toThrow();
  });

  it('propagates network failure so the control can offer a retry', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(setLocale('es')).rejects.toThrow('Failed to fetch');
  });
});
