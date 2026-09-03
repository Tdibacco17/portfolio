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
3. Agregar ese mismo ID bajo `experience` en ambos diccionarios, con `title`, `subTitle` y `stages`. Cada etapa requiere un ID estable, título, período y viñetas; el orden y los IDs deben coincidir entre idiomas.
4. Ejecutar `npm run build` y comprobar el render en ambas lenguas. No modificar el JSX del renderizador.

El orden vigente es House of CB, Strongwood, Donatella y 25Watts. Cada bloque renderiza un timeline vertical propio; una empresa puede tener uno o varios hitos. Las medidas del catálogo conservan las proporciones declaradas previamente; la imagen original de House of CB mide 2560×1128, mientras el atributo histórico de alto es 1127. Al sustituirla, comprobar el recorte real.

## Imágenes y CV

- Perfil: `/assets/img/tomas-v2.webp`; su `blurData` en `models/data.json` es una miniatura WebP de 8 px de ancho generada desde esa misma imagen. Next/Image aplica el desenfoque durante la carga.
- Experiencias: `/assets/img/houseofcb.avif`, `/assets/img/strongwood.png`, `/assets/img/donatella.png`, `/assets/img/25Watts.jpg`.
- CV servido por el sitio: `/assets/pdf/TomasDiBacco_CV_FullStack_{ES,EN}.pdf`. `app/page.tsx` pasa el locale resuelto a `PersonalIdentity`, que selecciona el asset del mismo idioma desde `models/data.json`.
- CV para revisión y postulaciones: `output/pdf/TomasDiBacco_CV_{FullStack,Frontend}_{ES,EN}.pdf`. Son cuatro combinaciones de orientación e idioma; sólo las variantes Full Stack se copian a `public/` para la descarga principal.
- URL compatible: `/assets/pdf/TomasDiBacco_Resume.pdf`. Se conserva para no romper enlaces existentes y sirve una copia vigente del CV Full Stack en español; ya no es la descarga principal.
- Fuente editable de esos borradores: `cv/content.json`, con contenido por idioma y orientación, estado de revisión, variante preferida y datos pendientes de confirmar. No inferir fechas ni métricas ausentes a partir de los diccionarios web.
- Los períodos viven una sola vez en `cv/content.json.timelines.companies`: `kind: calendar` usa intervalos `start`/`end` en `YYYY-MM` (`end: null` significa vigente); `kind: duration` usa `months` sin inventar fechas. Cada experiencia/proyecto referencia `timeline_id`; las `phases` de un proyecto referencian `timeline_period`. El generador deriva de esos datos las fechas traducidas de los hitos. `timelines.as_of` fija el mes límite usado al validar los períodos. El mantenimiento posterior se describe aparte.
- La presentación elegida es una línea de tiempo vertical: círculos negros alineados con los títulos y conectados por una línea gris, con fecha y viñetas al lado. `VerticalTimeline` mide los párrafos para ubicar cada hito; el espacio vertical depende del contenido, no de la duración. En experiencia profesional los cargos comparten una línea. En freelance cada empresa tiene su propio bloque y nodo principal; sus etapas usan una sangría de 14 puntos, círculos menores y ramas horizontales desde la línea de esa empresa. La línea termina en la última etapa y no conecta con la siguiente empresa. Los encabezados de empresa forman parte del timeline, no son prefijos externos.
- Generación: instalar `cv/requirements.txt` y ejecutar `python scripts/generate-cv.py`. El generador usa Arial desde `CV_FONT_DIR` (por defecto, las fuentes de Windows) o Vera incluida en ReportLab como alternativa. Un cambio de fuente exige revisar de nuevo la paginación. `--output-dir` permite separar previews.
- Referencia visual elegida para el CV: encabezado centrado, texto negro, enlaces azules subrayados y separadores grises, conservados por `scripts/generate-cv.py`. La experiencia profesional muestra cargos en negrita y empresas/fechas en cursiva. En freelance la empresa encabeza el bloque en negrita de 12 puntos; el rol va debajo en cursiva, y cada etapa tiene título y fecha propios. El generador registra las variantes reales regular, negrita y cursiva de Arial (o Vera como alternativa), con márgenes laterales de 54 puntos.
- Composición vigente: dos páginas; perfil y experiencia profesional en la primera, y experiencia freelance, formación, tecnologías e idiomas en la segunda. Las tecnologías van después de formación, siguiendo el orden del PDF de referencia. El encabezado del cuerpo muestra nombre, cargo objetivo y `headline_stack` de cada variante, seguido del contacto y las URLs visibles y clicables. El pie sólo contiene el número de página. El cuerpo usa 11 puntos con interlineado de 15. Las variantes cambian el énfasis, conservando las etapas y hechos del historial.
- Criterio editorial: priorizar acciones, tecnologías aplicadas y utilidad concreta; usar cargos reconocibles y evitar adjetivos generales o detalles repetidos. Los antecedentes que se recortan por relevancia y los datos por confirmar quedan en `review_notes`. No asignar a un proyecto una tecnología que sólo esté confirmada como habilidad general.
- Después de editar el contenido o generador, regenerar las cuatro versiones, renderizarlas y comprobar texto extraíble, enlaces, márgenes y paginación. La extracción con `pypdf` y `pdfplumber` permite revisar que las viñetas se lean completas y en orden; no equivale a una prueba en un ATS ni garantiza selección. El generador no modifica `public/` ni los diccionarios del portfolio; la publicación se integra aparte.

Sólo el perfil se precarga. Su `sizes` es 160px; las experiencias usan `(max-width: 723px) calc(100vw - 3rem), 42rem` y carga diferida de Next/Image. Se conserva calidad 100 y blur.

Si se sustituye una imagen, cambiar su nombre/ruta para evitar servir copias optimizadas viejas: el optimizador no proporciona invalidación inmediata del caché.

El nombre de descarga del CV se deriva del `pdfSrc` del locale. Al renombrarlo, sincronizar ambos archivos públicos y el mapa `es`/`en` de `models/data.json`, buscar referencias y verificar descarga. Revisar mayúsculas/minúsculas aunque Windows resuelva ambas.

## Iconos, tecnologías y colores

- El orden de `models/data.json.technologies` es el orden visible del stack.
- Cada propiedad `color` requiere su selector `.color-<valor>` y variable de color en `app/globals.css`.
- Los SVG de acción y enlace conservan `w-full h-full`; todos los SVG decorativos tienen `aria-hidden=true` y `focusable=false`.
- `otherLink`, cuando existe, es el enlace preferido; no reintroducir una condición por `iconId`.
- Evitar reformatear el JSON de datos completo: sus paths SVG y placeholders extensos requieren diffs puntuales.

La decisión de esta refactorización fue mantener la paleta y no cambiar zoom. El texto separador y algunos textos de tecnologías en hover tienen contraste insuficiente; no asumir conformidad WCAG completa por el puntaje de Lighthouse.
