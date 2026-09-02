# Flujos de ejecución

## Render de la home

1. `app/layout.tsx` obtiene locale y clasificación de dispositivo.
2. El layout renderiza `LanguageHandler` y después la ruta solicitada.
3. `app/page.tsx` vuelve a obtener locale y dispositivo para componer las seis áreas de la home.
4. Los componentes servidor cargan el diccionario correspondiente y pasan a los componentes cliente sólo los datos necesarios para interacción.

La composición actual de `app/page.tsx` define tanto el orden visual como los puntos de entrada de cada sección.

## Selección y cambio de idioma

```text
cookie lang válida
  -> getLocale usa cookie
sin cookie válida
  -> Accept-Language compatible (en/es)
sin coincidencia
  -> inglés por defecto
```

- `utils/getLocale.ts` reconoce únicamente `en` y `es`; `defaultLocale` es `en`.
- `models/en.json` y `models/es.json` son cargados por `utils/dictionaries.ts` mediante imports dinámicos del lado servidor.
- `LanguageHandler` recibe el locale resuelto y la cookie. Si falta o no coincide, llama a `POST /api/cookie` desde un `useEffect`.
- Al pulsar el selector, publica el locale opuesto como un string JSON, y luego navega a `/` para volver a renderizar.
- `app/api/cookie/route.ts` guarda `lang` por un día, con `sameSite: 'strict'` y `path: '/'`.
- Si el cambio de idioma no devuelve estado lógico `201`, `LanguageHandler` invoca `notFound()`; el `app/not-found.tsx` actual redirige a `/`.
- El atributo `<html lang>` está actualmente fijo en `en`; no asumas que refleja el locale elegido.

## Detección de dispositivo

```text
header User-Agent de la solicitud
  -> utils/getUserAgent.ts
  -> POST ${BASE_PATH}/api/userAgent
  -> userAgent(request) de Next.js
  -> isMobile = mobile o tablet
```

- `next.config.mjs` expone `process.env.BASE_PATH` al código que construye las URLs internas.
- Ante una respuesta lógica distinta de `201`, `getUserAgent` conserva el `isMobile` devuelto por la API.
- `isMobile` no sólo acompaña el layout responsivo: desactiva varios estados hover. La elección de `otherLink` (`wa.me`) para WhatsApp es un acoplamiento separado basado en el `iconId`.
- `PersonalIdentity`, `Experience`, `Stack`, `LanguageHandler`, `CopyToClipboard` e iconos reciben o propagan este indicador.

## Límites server/client

Componentes cliente explícitos:

- `components/LanguageHandler/LanguageHandler.tsx`: `useEffect`, fetch, click y `window.location`.
- `components/CopyToClipboard/CopyToClipboard.tsx`: `useState`, Clipboard API y timeout.
- `components/ScrollToTop/ScrollToTop.client.tsx`: click, `window` y scroll.

Mantén las lecturas de `headers()` y `cookies()` del lado servidor. Si una pieza compartida pasa a usar hooks o APIs del navegador, revisa el límite de bundle que crea `'use client'`.

## Contratos internos actuales

- `POST /api/cookie` recibe el cuerpo JSON como string de locale, no como objeto.
- `POST /api/userAgent` toma la clasificación del header `User-Agent` de la solicitud reenviada.
- Ambas APIs devuelven un campo `status` dentro del JSON; los consumidores verifican ese campo, no sólo el status HTTP.
- Las rutas de fetch se construyen con `process.env.BASE_PATH`; un cambio de despliegue debe comprobar cliente y servidor.
