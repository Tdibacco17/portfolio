# Experiencia acumulada

Consulta estas lecciones antes de modificar las áreas relacionadas. Registra sólo hallazgos comprobados que cambien cómo conviene trabajar en una tarea futura.

## Lecciones vigentes

### El timeline debe mostrar a qué empresa pertenece cada etapa

- Evidencia: el encabezado de una empresa estaba fuera del timeline y sus etapas compartían una línea con el siguiente cliente, haciendo ambigua la pertenencia. `scripts/generate-cv.py` ahora genera un timeline por cliente, con la empresa como nodo principal y las etapas indentadas; los cuatro PDF muestran grupos separados.
- Regla reusable: al representar varios proyectos de una empresa, conservar una jerarquía visible empresa-etapas y cortar la conexión antes del siguiente cliente. No depender sólo de la cercanía de un nombre externo a la línea.

### En la web la fecha va debajo del título de la etapa

- Fecha: 2026-09-03.
- Contexto: alinear House of CB y 25Watts con Donatella y Strongwood, sin cambiar el CV.
- Evidencia: los diccionarios web mueven `may. 2024 - actualidad` y `oct. 2022 - abr. 2024` al `period` de la primera etapa; el subtítulo de empresa queda sólo el rol. `cv/content.json` y el generador conservan el tramo continuo en el encabezado `rol | período`. Las pruebas comparan esos `period` de etapa contra `cv/content.json.timelines`.
- Regla reusable: en el portfolio web, mostrar fechas o contexto debajo del título de la etapa. El subtítulo de la empresa es el rol, más freelance cuando aplica. El CV sigue mostrando un tramo laboral continuo en el encabezado de la empresa. No copiar la presentación del CV a la web ni viceversa.

### Un hito único también usa `phases` en el CV

- Fecha: 2026-09-03.
- Contexto: Donatella y 25Watts tenían viñetas sueltas bajo la empresa, sin la cabecera de etapa que ya existía en la web.
- Evidencia: sin `phases`, `VerticalTimeline` agrupa empresa y viñetas en un solo nodo (punto aislado). Con un array de una fase, hay nodo de empresa más hito indentado y rail, igual que Strongwood y House of CB. Los cuatro PDF muestran `Sitios web para clientes` / `Client websites` y `Sistema de facturación y gestión` / `Billing and management system`. La fecha del período único sigue en `rol | período`; no se duplica en la etapa.
- Regla reusable: si la web tiene título de etapa, el CV usa `phases` aunque haya un solo ítem. No omitir `phases` para ahorrar estructura ni copiar la fecha del encabezado de empresa a una etapa de período único.

### Ampliar el CV conserva las etapas anteriores

- Evidencia: la primera ampliación había dejado una sola fecha global para un cliente con varios proyectos y había deducido un rango abierto para un desarrollo de duración limitada. La corrección incorpora `phases` en `cv/content.json`, las renderiza en `scripts/generate-cv.py` y verifica su presencia en los cuatro PDF.
- Regla reusable: contrastar toda ampliación con el CV de origen y la información nueva; distinguir etapas, duración del desarrollo y soporte posterior. Un nuevo trabajo para un cliente no reemplaza sus proyectos anteriores. Cambiar el enfoque Frontend/Full Stack modifica el énfasis, no la cronología.

### El nombre de descarga del CV debe seguir al asset

- Evidencia: el commit `a984b9d` renombró el asset y actualizó `models/data.json`; el commit posterior `97b5ded` corrigió el nombre de descarga en `PersonalIdentity.tsx`.
- Estado actual: `components/personal-identity.tsx` deriva `download` de `pdfSrc`; ya no hay un tercer nombre literal que mantener.
- Regla reusable: al renombrar el PDF, sincronizar archivo público y `pdfSrc`, buscar el nombre anterior y comprobar la descarga. Conservar la derivación para no repetir el fallo histórico.

### Los SVG compartidos necesitan tamaño explícito

- Evidencia: el hotfix `c7d8d99` agregó `w-full h-full` a los SVG de `IconLinkComponent` e `IconComponent` para corregir iconos en Safari.
- Regla reusable: no retirar esas dimensiones basándose sólo en el comportamiento de un navegador; verificar Safari o un equivalente WebKit al cambiar los wrappers de iconos.

### El orden de las tecnologías vive en el JSON

- Evidencia: `components/stack.tsx` usa `Object.values(data.technologies)`; el commit `a984b9d` reordenó propiedades de `models/data.json` sin cambiar el renderizador.
- Regla reusable: para reordenar tarjetas, cambia de forma deliberada el orden de las propiedades y revisa que un formateador no lo altere accidentalmente.

### El hover depende de capacidades de entrada, sin peticiones al propio servidor

- Fecha: 2026-09-02.
- Evidencia: la detección anterior propagaba `isMobile` únicamente para estilos; el refactor reemplazó esa cadena por CSS `(hover: hover)` / `(hover: none)` y eliminó el endpoint y `BASE_PATH`. La comparación de estilos confirma los estados de escritorio y táctil; el build y las pruebas HTTP funcionan sin origen configurado.
- Regla reusable: no agregar detección de user-agent para decidir hover. Mantener relativas las rutas de servicios del mismo origen.

### Lighthouse no cubre todas las interacciones accesibles

- Fecha: 2026-09-02.
- Evidencia: Lighthouse dio 100 de accesibilidad antes y después, aunque el código anterior tenía acciones en div/p sin teclado. Axe detectó el contraste 3,17:1 del separador inglés; el texto Next.js en hover tiene contraste 1,55:1 sobre #2e2e2e.
- Regla reusable: comprobar teclado, árbol accesible y estados interactivos además del puntaje automático. Una paleta conservada por decisión del usuario no equivale a conformidad WCAG.

### Alinea TypeScript y ESLint con `eslint-config-next`

- Fecha: 2026-09-02.
- Contexto: actualización integral a Next.js 16, React 19 y Tailwind CSS 4.
- Evidencia: la prueba con TypeScript 7 y ESLint 10 hizo fallar `npm run lint` por el rango soportado por `typescript-eslint`; TypeScript 6.0.3 y ESLint 9.39.5 pasaron lint, typecheck y build con `eslint-config-next` 16.3.4.
- Regla reusable: antes de subir TypeScript o ESLint a la última versión absoluta, comprobar los peers y rangos transitivos de `eslint-config-next` y validar la combinación ejecutando el lint real del repositorio.

### Los estilos globales de Tailwind 4 deben declarar su capa

- Fecha: 2026-09-02.
- Contexto: migración del tema y del pipeline PostCSS desde Tailwind CSS 3 a 4.
- Evidencia: la primera migración dejó reglas globales sin capa que prevalecían sobre `flex`, `p-3` y `text-*`; la comparación visual contra producción mostró iconos encogidos y texto invisible hasta mover resets a `@layer base` y estilos de iconos a `@layer components`.
- Regla reusable: al agregar o mover CSS global, asignarlo a `base` o `components` según su responsabilidad y comparar estilos computados para confirmar que las utilities conservan la precedencia esperada.

## Formato para una nueva lección

```markdown
### Título accionable

- Fecha: YYYY-MM-DD.
- Contexto: área o tarea en la que apareció.
- Evidencia: diff, archivo, prueba o fallo observado.
- Regla reusable: qué debe revisar o hacer la próxima tarea y bajo qué condición.
```

Antes de agregar una entrada, confirma que:

- no duplica el mapa ni otra lección;
- no generaliza desde una preferencia aislada;
- sigue siendo útil fuera del cambio puntual;
- no contiene secretos ni datos privados nuevos;
- puede eliminarse o corregirse si el código deja de respaldarla.
