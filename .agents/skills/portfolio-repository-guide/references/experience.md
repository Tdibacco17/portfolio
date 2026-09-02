# Experiencia acumulada

Consulta estas lecciones antes de modificar las áreas relacionadas. Registra sólo hallazgos comprobados que cambien cómo conviene trabajar en una tarea futura.

## Lecciones vigentes

### Una renombrada del CV tiene tres puntos de sincronización

- Evidencia: el commit `a984b9d` renombró el asset y actualizó `models/data.json`; el commit posterior `97b5ded` corrigió el nombre de descarga en `PersonalIdentity.tsx`.
- Regla reusable: al renombrar el PDF, sincronizar archivo público, `pdfSrc` y atributo `download`, y luego buscar el nombre anterior en todo el repo.

### Los SVG compartidos necesitan tamaño explícito

- Evidencia: el hotfix `c7d8d99` agregó `w-full h-full` a los SVG de `IconLinkComponent` e `IconComponent` para corregir iconos en Safari.
- Regla reusable: no retirar esas dimensiones basándose sólo en el comportamiento de un navegador; verificar Safari o un equivalente WebKit al cambiar los wrappers de iconos.

### El orden de las tecnologías vive en el JSON

- Evidencia: `Stack.tsx` usa `Object.values(data.technologies)` y el commit `a984b9d` reordenó propiedades de `models/data.json` sin cambiar el renderizador.
- Regla reusable: para reordenar tarjetas, cambia de forma deliberada el orden de las propiedades y revisa que un formateador no lo altere accidentalmente.

### `BASE_PATH` forma parte de los fetch internos

- Evidencia: el commit `8c7ae7e` expuso `BASE_PATH` desde `next.config.mjs` durante un arreglo de entorno; `LanguageHandler.tsx` y `utils/getUserAgent.ts` construyen sus endpoints con esa variable.
- Regla reusable: al tocar configuración de despliegue o rutas API, comprobar tanto el fetch cliente de cookie como el fetch servidor de user-agent.

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
