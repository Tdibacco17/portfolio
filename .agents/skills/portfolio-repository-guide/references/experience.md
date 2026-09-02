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
