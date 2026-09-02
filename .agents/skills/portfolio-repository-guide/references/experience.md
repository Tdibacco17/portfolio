# Experiencia acumulada

Consulta estas lecciones antes de modificar las áreas relacionadas. Registra sólo hallazgos comprobados que cambien cómo conviene trabajar en una tarea futura.

## Lecciones vigentes

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
