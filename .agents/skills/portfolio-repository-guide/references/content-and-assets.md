# Contenido, datos y assets

## Fuentes y contratos

- `models/en.json` y `models/es.json`: textos visibles y mensajes accesibles traducibles.
- `models/experiences.ts`: catálogo ordenado, IDs y metadatos de imágenes de experiencias.
- `models/data.json`: perfil, enlaces, SVG, CV y tecnologías. No importar este JSON completo desde componentes cliente.
- `models/dictionary.ts`: contrato común; exige traducciones para cada `ExperienceId` derivado del catálogo.
- `tests/content.test.ts`: compara claves y tipos de ambos idiomas, IDs únicos/correspondientes y assets existentes con capitalización correcta.

Las ramas traducibles son `personalIdentity`, `aboutMe`, `experience`, `technologies`, `education`, `languages`, `scrollToTop` y `languageHandler`. Un cambio estructural exige actualizar ambos idiomas. No usar fallbacks silenciosos para ocultar claves ausentes: el build corre las pruebas de contenido.

## Agregar una experiencia

1. Añadir la imagen a `public/assets/img/`.
2. Agregar una entrada al array `experiences` en `models/experiences.ts`, en su posición de presentación. Definir un ID estable, `src`, `alt`, `blurData`, `width` y `height`.
3. Agregar ese mismo ID bajo `experience` en ambos diccionarios, con `title`, `subTitle` y `list`.
4. Ejecutar `npm run build` y comprobar el render en ambas lenguas. No modificar el JSX del renderizador.

El orden vigente es House of CB, Strongwood y 25Watts. Las medidas del catálogo conservan las proporciones declaradas previamente; la imagen original de House of CB mide 2560×1128, mientras el atributo histórico de alto es 1127. Al sustituirla, comprobar el recorte real.

## Imágenes y CV

- Perfil: `/assets/img/tomas.webp`.
- Experiencias: `/assets/img/houseofcb.avif`, `/assets/img/strongwood.png`, `/assets/img/25Watts.jpg`.
- CV: `/assets/pdf/TomasDiBacco_Resume.pdf`.

Sólo el perfil se precarga. Su `sizes` es 160px; las experiencias usan `(max-width: 723px) calc(100vw - 3rem), 42rem` y carga diferida de Next/Image. Se conserva calidad 100 y blur.

Si se sustituye una imagen, cambiar su nombre/ruta para evitar servir copias optimizadas viejas: el optimizador no proporciona invalidación inmediata del caché.

El nombre de descarga del CV se deriva de `pdfSrc`. Al renombrarlo, sincronizar el archivo público y `models/data.json`, buscar referencias y verificar descarga. Revisar mayúsculas/minúsculas aunque Windows resuelva ambas.

## Iconos, tecnologías y colores

- El orden de `models/data.json.technologies` es el orden visible del stack.
- Cada propiedad `color` requiere su selector `.color-<valor>` y variable de color en `app/globals.css`.
- Los SVG de acción y enlace conservan `w-full h-full`; todos los SVG decorativos tienen `aria-hidden=true` y `focusable=false`.
- `otherLink`, cuando existe, es el enlace preferido; no reintroducir una condición por `iconId`.
- Evitar reformatear el JSON de datos completo: sus paths SVG y placeholders extensos requieren diffs puntuales.

La decisión de esta refactorización fue mantener la paleta y no cambiar zoom. El texto separador y algunos textos de tecnologías en hover tienen contraste insuficiente; no asumir conformidad WCAG completa por el puntaje de Lighthouse.
