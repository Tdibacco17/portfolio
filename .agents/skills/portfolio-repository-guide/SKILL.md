---
name: portfolio-repository-guide
description: Orienta cambios, diagnósticos y revisiones en el portfolio Next.js de Tomás Di Bacco; ubica responsabilidades, fuentes de verdad, flujos, contenido y assets, y conserva aprendizaje verificable después de trabajar en este repositorio. Úsala para tareas dentro de este repo, no para otros proyectos.
metadata:
  short-description: Mapa y memoria evolutiva del portfolio
---

# Portfolio Repository Guide

Usa esta skill como mapa de navegación y memoria técnica del repositorio. La implementación vigente sigue siendo la fuente de verdad: confirma en los archivos reales cualquier dato que pueda haber cambiado.

## Orientar la tarea

1. Confirma que el repositorio es el paquete `portfolio` y toma como raíz la salida de `git rev-parse --show-toplevel`.
2. Revisa el estado y el diff existentes antes de atribuirte cambios. Conserva las modificaciones ajenas a la tarea.
3. Lee sólo las referencias necesarias:
   - Para ubicar archivos, responsabilidades, configuración o comandos, consulta [repository-map.md](references/repository-map.md).
   - Para idioma, cookies, detección de dispositivo, composición de la página o límites server/client, consulta [runtime-flows.md](references/runtime-flows.md).
   - Para textos, datos estáticos, iconos, imágenes o el PDF del CV, consulta [content-and-assets.md](references/content-and-assets.md).
   - Antes de cambiar un área con antecedentes relevantes, consulta [experience.md](references/experience.md).
4. Inspecciona directamente los consumidores y productores implicados. No deduzcas un contrato sólo por el nombre de una carpeta o por esta documentación.

## Mantener el conocimiento

Realiza una pasada de retroalimentación al final de toda tarea que cambie archivos del repositorio:

1. Examina el diff final y la verificación realizada.
2. Actualiza el mapa correspondiente si cambió una ruta, responsabilidad, fuente de verdad, flujo, contrato, acoplamiento, comando de verificación o invariante.
3. Añade una entrada a `experience.md` sólo cuando la tarea revele una lección no obvia, reutilizable y respaldada por el diff, una prueba o un fallo observado.
4. Si el cambio fue rutinario y no altera conocimiento durable, no agregues ruido. La pasada de retroalimentación sigue siendo obligatoria aunque concluya sin edición documental.
5. Si la documentación contradice al código vigente, corrige la documentación dentro del alcance de la tarea y deja asentada la evidencia cuando constituya una lección reusable.

No registres secretos, datos privados nuevos, hipótesis sin verificar, detalles transitorios del entorno ni una cronología exhaustiva de cambios. Resume el aprendizaje como una regla útil para la próxima tarea, no como un diario de actividad.

## Cierre

- Verifica que todo archivo o símbolo mencionado todavía exista.
- Mantén rutas relativas a la raíz del repositorio.
- Ejecuta `quick_validate.py` sobre esta skill cuando cambien `SKILL.md` o sus metadatos.
- Informa si la retroalimentación actualizó la memoria o si no apareció conocimiento durable nuevo.
