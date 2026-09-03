# Mapa del repositorio

## Identidad y convenciones

- Paquete `portfolio`, remoto `Tdibacco17/portfolio`: portfolio personal de una sola página, sin base de datos.
- Next.js 16.3.4 (App Router), React 19.2.8, TypeScript 6 estricto, Tailwind CSS 4.3.3 y Geist.
- Node.js mínimo 22.12.0, requerido por Vite, dependencia de Vitest. El alias `@/*` apunta a la raíz.
- Componentes directamente en `components/`, archivos kebab-case y funciones React PascalCase. No crear una carpeta por componente.
- `components/icons/` agrupa `icon.tsx`, `icon-link.tsx` y `tech-icon.tsx`; el icono básico no importa enlaces ni datos del portfolio.
- Concentrar la documentación de mantenimiento en esta skill. Entregar informes de tareas y mediciones en la conversación, sin agregar archivos Markdown al repositorio salvo pedido explícito.

## Entradas y responsabilidades

| Ruta | Responsabilidad |
| --- | --- |
| `app/layout.tsx` | Metadata, fuente, idioma del documento, main y selector de idioma. |
| `app/page.tsx` | Carga el diccionario y compone identidad, presentación, experiencia, stack y educación. |
| `app/globals.css` | Layout, tokens, hover de tecnologías, foco visible y movimiento reducido. |
| `app/api/cookie/route.ts` | Valida y guarda la cookie de idioma mediante POST. |
| `app/not-found.tsx` | Conserva la redirección de rutas inexistentes a la home. |
| `app/robots.ts` | Reglas de rastreo. No anuncia un sitemap inexistente. |

## Componentes

| Archivo dentro de `components/` | Papel |
| --- | --- |
| `personal-identity.tsx` | Foto, identidad, redes, contacto y selección del CV Full Stack por locale. |
| `copy-to-clipboard.tsx` | Cliente: botón de copia, estado accesible y temporizador. |
| `about-me.tsx` | Presentación. |
| `experience.tsx` | Un solo renderizador de experiencias y sus timelines internos. |
| `stack.tsx` | Recorre tecnologías en el orden de `models/data.json`. |
| `education.tsx` | Educación, certificado e idiomas. |
| `language-handler.tsx` | Cliente: persistencia automática, cambio de idioma y errores recuperables. |
| `section-heading.tsx` | Encabezado h2 con el posicionamiento visual de los rótulos de sección. |

## Fuentes de verdad

| Necesidad | Archivo |
| --- | --- |
| Locales, cookie y negociación pura | `utils/locale.ts` |
| Lectura de cookies/headers, memoizada por solicitud | `utils/get-locale.ts` |
| Carga de diccionarios en servidor | `utils/dictionaries.ts` |
| Escritura cliente y comprobación de persistencia | `utils/set-locale.ts` |
| Contrato bilingüe | `models/dictionary.ts` |
| Catálogo ordenado de experiencias, layout, IDs e imágenes | `models/experiences.ts` |
| Textos traducibles | `models/en.json`, `models/es.json` |
| Perfil, enlaces, SVG y tecnologías | `models/data.json` |
| Contenido editable de los cuatro borradores de CV | `cv/content.json` |
| Generador independiente de PDF y dependencias | `scripts/generate-cv.py`, `cv/requirements.txt` |
| PDFs de CV para revisión y postulaciones | `output/pdf/` |

No hay API de user-agent ni variable `BASE_PATH`: los estados hover se resuelven con CSS. El respaldo histórico y el asset alternativo de 25Watts sin consumidores fueron retirados; no son fuentes de contenido.

## Configuración y verificación

- `next.config.mjs`: tamaños responsivos y calidades 75/100; mantiene AVIF/WebP. Usa el TTL predeterminado de Next.
- `vitest.config.ts`: pruebas Node, alias de la raíz e inclusión de `tests/**/*.test.ts`.
- `npm run dev -- -p 4000` / `npm run start -- -p 4000`: desarrollo / producción local. Usar siempre el puerto 4000 para este repositorio; 3000 y 3001 están reservados para otros trabajos del usuario.
- `npm run test`: negociación, endpoint, persistencia cliente y contratos de contenido.
- `npm run lint` / `npm run typecheck`: ESLint y TypeScript.
- `npm run build`: ejecuta las pruebas antes del build; detecta traducciones y assets faltantes antes de publicar.
- Para el flujo de idioma, consultar `runtime-flows.md`.
