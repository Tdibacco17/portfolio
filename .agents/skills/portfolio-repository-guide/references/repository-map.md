# Mapa del repositorio

## Identidad y stack

- Repositorio remoto: `Tdibacco17/portfolio`.
- Aplicación: portfolio personal de una sola página.
- Framework: Next.js 14.2.4 con App Router y React 18.
- Lenguaje: TypeScript estricto; alias `@/*` apuntando a la raíz.
- UI: Tailwind CSS 3.4, CSS global y fuente Geist.
- Persistencia: no hay base de datos. El contenido vive en JSON y los assets en `public/`.

## Entradas principales

| Ruta | Responsabilidad actual |
| --- | --- |
| `app/layout.tsx` | Metadata, viewport, fuente, contenedor raíz, locale inicial, detección de dispositivo y selector de idioma. |
| `app/page.tsx` | Compone la home en orden: identidad, presentación, experiencia, stack, educación y volver arriba. |
| `app/globals.css` | Reset, layout global, scrollbar y colores/transiciones de iconos de tecnologías. |
| `app/not-found.tsx` | Redirige cualquier estado not-found a `/`. |
| `app/robots.ts` | Reglas de rastreo y URL de sitemap. No existe actualmente un `app/sitemap.ts`. |
| `app/api/cookie/route.ts` | `POST` que persiste el idioma en la cookie `lang`. |
| `app/api/userAgent/route.ts` | `POST` que clasifica móvil/tablet con `userAgent` de Next.js. |

## Componentes

| Área | Archivo | Papel |
| --- | --- | --- |
| Identidad | `components/PersonalIdentity/PersonalIdentity.tsx` | Foto, nombre/rol, redes, contacto y descarga del CV. |
| Copiar email | `components/CopyToClipboard/CopyToClipboard.tsx` | Componente cliente con Clipboard API y estado temporal de éxito. |
| Presentación | `components/AboutMe/AboutMe.tsx` | Renderiza los tres párrafos de “Sobre mí”. |
| Experiencia | `components/Experience/Experience.tsx` | Renderiza House of CB, Strongwood y 25Watts con imagen y bullets. |
| Tecnologías | `components/Stack/Stack.tsx` | Recorre `models/data.json` con `Object.values`; el orden del JSON es visible. |
| Educación | `components/Education/Education.tsx` | Bootcamp, certificado e idiomas. |
| Idioma | `components/LanguageHandler/LanguageHandler.tsx` | Componente cliente que inicializa/cambia la cookie y recarga la home. |
| Iconos | `components/Icons/Icons.tsx` | Tipos y renderizadores compartidos para enlaces, acciones y tecnologías. |
| Secciones | `components/Section/Section.tsx` | Rótulo visual reutilizado por las secciones. |
| Volver arriba | `components/ScrollToTop/ScrollToTop.tsx` | Wrapper servidor que obtiene el diccionario. |
| Volver arriba | `components/ScrollToTop/ScrollToTop.client.tsx` | Interacción cliente de scroll suave. |

Los componentes sin `'use client'` son compatibles con Server Components. `Icons.tsx` puede quedar incluido en el bundle cliente cuando lo importa un componente cliente.

## Utilidades y fuentes de verdad

| Necesidad | Fuente principal | Consumidores destacados |
| --- | --- | --- |
| Selección de idioma | `utils/getLocale.ts` | `app/layout.tsx`, `app/page.tsx`. |
| Carga de traducciones | `utils/dictionaries.ts` | Componentes de contenido. |
| Copia traducible | `models/en.json`, `models/es.json` | Diccionarios cargados en servidor y props hacia clientes. |
| Links, SVG, imágenes y tecnologías | `models/data.json` | Identidad, iconos, experiencia y stack. |
| Clasificación móvil | `utils/getUserAgent.ts` y `app/api/userAgent/route.ts` | Layout, página y props `isMobile`. |
| Scroll suave | `utils/scrollToSection.ts` | `ScrollToTop.client.tsx`. |
| Assets públicos | `public/assets/img/`, `public/assets/pdf/` | Rutas absolutas desde `models/data.json`. |

`models/backup.data-old.json` es un respaldo histórico y no tiene imports vigentes. No lo trates como fuente de verdad ni lo elimines sin una solicitud explícita.

## Configuración

| Archivo | Qué controla |
| --- | --- |
| `package.json` | Dependencias y scripts. |
| `next.config.mjs` | Optimización de imágenes y exposición de `BASE_PATH`. |
| `tailwind.config.ts` | Rutas escaneadas y tokens visuales propios. |
| `tsconfig.json` | TypeScript estricto, `noEmit` y alias `@/*`. |
| `.eslintrc.json` | Extiende `next/core-web-vitals`. |
| `postcss.config.mjs` | Pipeline de Tailwind/PostCSS. |

## Comandos disponibles

- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de producción; es la verificación integral disponible.
- `npm run start`: sirve el build.
- `npm run lint`: lint configurado por Next.js.

No hay script de tests ni framework de pruebas configurado. Elige la verificación proporcional al cambio y no afirmes que existe cobertura automatizada.
