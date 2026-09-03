# Flujos de ejecución

## Render e idioma

1. Layout y página consumen `getLocale()`, memoizado con `React.cache` sólo dentro de la solicitud.
2. Una cookie `lang` válida (`en` o `es`) tiene prioridad. Sin ella, se negocia `Accept-Language`: variantes regionales, mayúsculas y calidad `q`; se descartan entradas inválidas y `q=0`.
3. Sin coincidencia compatible, se usa español. Empates de calidad conservan el orden del header.
4. El resultado es `{ locale, needsCookie }`. El servidor usa ese locale para el documento, el contenido y el PDF Full Stack ofrecido para descarga desde el primer render.
5. `getDictionary(locale)` importa el JSON en servidor y también se memoiza por solicitud. No usar caché global para preferencias de visitantes.

## Persistencia y cambios

- `POST /api/cookie` conserva el cuerpo JSON como string: `"en"` o `"es"`.
- Devuelve HTTP 200 con `{ locale }`; JSON o locale inválido devuelve 400 y no escribe cookies. Un fallo de escritura devuelve 500 con un mensaje genérico.
- Cookie `lang`: Max-Age 2592000 (30 días), Path=/, SameSite=Lax y Secure bajo HTTPS, incluyendo terminación TLS informada por `x-forwarded-proto`.
- La cookie no es HttpOnly: contiene una preferencia no sensible y el cliente comprueba su persistencia mediante `document.cookie`.
- Si falta, es inválida o venció, `LanguageHandler` persiste automáticamente el idioma resuelto después de hidratar. Una visita con cookie válida no la renueva.
- Una elección manual inicia otros 30 días. Tras confirmarse la escritura, `router.refresh()` actualiza contenido, `html[lang]` y el enlace del CV.
- La inicialización comparte una única promesa entre efectos de Strict Mode. El botón permanece deshabilitado durante la escritura y el refresh; una referencia evita cambios manuales duplicados.
- La URL cliente es relativa. `setLocale` comprueba HTTP, cuerpo y cookie persistida; la solicitud tiene un límite de 10 segundos.
- Los fallos dejan el contenido actual, presentan un mensaje visible con `role=status` y permiten reintentar. No redirigir a not-found, no refrescar en bucle ni anunciar éxito si se bloqueó la cookie.
- Sin JavaScript, el contenido inicial y su idioma siguen renderizados en servidor; la persistencia y el selector requieren hidratación.

## Interacción y límites cliente/servidor

Sólo `language-handler.tsx` y `copy-to-clipboard.tsx` declaran `'use client'`. Reciben textos mínimos e iconos como ReactNode, sin importar `models/data.json` ni diccionarios completos.

- Hover de escritorio: utilities de Tailwind y reglas globales limitadas a `(hover: hover)`.
- Táctil: `(hover: none)` conserva la apariencia activa del selector de idioma; las tecnologías mantienen sus colores de reposo.
- `IconLink` usa `otherLink ?? link`: conserva el destino WhatsApp sin depender de un ID numérico ni de user-agent.
- Copiar email: botón nativo, aviso de éxito/error, bloqueo de escrituras simultáneas y limpieza del temporizador al desmontar.
- `prefers-reduced-motion` desactiva desplazamiento suave y transiciones de tecnologías.
