# Contenido, datos y assets

## Separación de responsabilidades

- `models/en.json` y `models/es.json`: todo texto visible que cambia por idioma.
- `models/data.json`: datos no traducibles, links, metadatos de iconos, rutas de imágenes, blur placeholders y tecnologías.
- `public/assets/img/`: foto personal e imágenes de experiencia.
- `public/assets/pdf/TomasDiBacco_Resume.pdf`: CV descargable actual.

Evita duplicar copy traducible en componentes o `data.json`. Evita mover SVG paths o blur data a los diccionarios de idioma.

## Paridad bilingüe

Los dos diccionarios deben mantener la misma forma. Las ramas vigentes son:

- `personalIdentity`
- `aboutMe`
- `experience.houseofcb`
- `experience.strongwood`
- `experience.watts`
- `technologies`
- `education`
- `languages`
- `scrollToTop`

Cuando agregues, elimines o renombres una clave, actualiza ambos idiomas y todos sus consumidores en la misma tarea. Un cambio sólo de redacción puede modificar un único idioma si ésa es la intención explícita.

## `models/data.json`

- `language` cumple el contrato de icono de acción.
- `personalIdentity.img` aporta `src`, `alt` y `blurData`.
- `personalIdentity.networks` se recorre con `Object.values`.
- `personalIdentity.contact` contiene Gmail, copiar y éxito.
- `personalIdentity.cv.pdfSrc` apunta al PDF público.
- `experience.*.img` aporta imagen y placeholder para cada experiencia.
- `technologies` se recorre con `Object.values`; el orden de las propiedades es el orden visible de las tarjetas.

El archivo contiene paths SVG y blur data extensos. Haz ediciones puntuales y evita reformatearlo completo, porque un diff masivo oculta cambios reales.

## Acoplamientos de iconos y tecnologías

- Las interfaces viven en `components/Icons/Icons.tsx`: `LinkIconInterface`, `IconInterface` y `TechIconInterface`.
- `IconLinkComponent` usa `otherLink` cuando el consumidor lo solicita. En identidad, esa selección está acoplada actualmente a `iconId === 3` para WhatsApp, independientemente de `isMobile`.
- Cada `technologies.<id>.color` genera la clase CSS `color-<valor>`.
- Ese valor debe tener su variable `--<valor>-color` y selector correspondiente en `app/globals.css`.
- Los SVG generales tienen dimensiones explícitas mediante clases `w-full h-full`; conserva ese detalle salvo que verifiques los navegadores relevantes.

## Imágenes y CV

Rutas actualmente activas:

- Perfil: `/assets/img/tomas.webp`.
- House of CB: `/assets/img/houseofcb.avif`.
- Strongwood: `/assets/img/strongwood.png`.
- 25Watts: `/assets/img/25Watts.jpg`.
- CV: `/assets/pdf/TomasDiBacco_Resume.pdf`.

Si cambia el nombre del CV, sincroniza como mínimo:

1. El archivo dentro de `public/assets/pdf/`.
2. `models/data.json` en `personalIdentity.cv.pdfSrc`.
3. El atributo `download` de `components/PersonalIdentity/PersonalIdentity.tsx`.

Después de cambiar cualquier asset, busca referencias al nombre anterior en todo el repositorio y comprueba la ruta con la misma capitalización. En Windows una diferencia de mayúsculas puede quedar oculta y fallar al desplegar en un sistema sensible a mayúsculas.

## Validación orientativa

- Parsea los tres JSON activos para detectar sintaxis inválida.
- Compara recursivamente las claves de `models/en.json` y `models/es.json` cuando cambie su estructura.
- Busca rutas de `models/data.json` bajo `public/` y confirma que existan.
- Para cambios de contenido o assets, valida además el render de ambas lenguas y los enlaces/descargas afectados.
