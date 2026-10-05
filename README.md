# Savia Spa · Wellness & Beauty

Landing de demostración para un spa boutique ficticio en Mazatlán. One page en español, con React, Vite, TypeScript, Tailwind CSS y Lucide. Incluye todas las secciones del brief, navegación móvil accesible, enlaces de WhatsApp, movimiento reducido, fuentes locales y 13 ilustraciones SVG originales como fallback.

## Ejecutar

Requiere Node.js 22.12 o superior (verificado con Node 24).

```sh
npm install
npm run dev
```

En PowerShell con scripts deshabilitados, utiliza `npm.cmd` en lugar de `npm`.

```sh
npm run build       # TypeScript + producción en dist/
npm run typecheck   # TypeScript
npm run lint        # ESLint, cero warnings permitidos
npm run test:e2e    # Playwright + axe, Chromium
npm run preview    # Vista de la compilación de producción
```

Si Chromium no está instalado para Playwright: `npx playwright install chromium`.
Las pruebas usan el puerto 5198 y nunca reutilizan servidores ajenos. Las capturas quedan en `test-results/` (ignorado por Git). La prueba de recuperación simula JPG dañados en el navegador; nunca modifica las fotografías originales.

## Personalización

Todos los datos comerciales están en **`src/data/site.ts`**:

- `spa.name`, `spa.wordmark`, `spa.tagline`: identidad y marca tipográfica.
- `spa.location`, `spa.address`, `spa.addressNote`: ciudad y dirección.
- `spa.phone`, `spa.whatsapp`, `spa.whatsappMessage`: contacto y mensaje prellenado. WhatsApp utiliza código de país y solo dígitos.
- `spa.instagram`, `spa.instagramUrl`, `spa.mapsUrl`: enlaces externos.
- `spa.schedule`: horarios.
- `spa.images`: archivos, fallbacks, textos alternativos y dimensiones.
- `navigation`, `experiences`, `benefits`, `testimonials`, `gallery`, `socialGallery`: contenido repetible.

El helper `src/lib/whatsapp.ts` construye todos los enlaces `wa.me`. Cada tratamiento añade su nombre al mensaje. Ningún CTA procesa una reserva: abre WhatsApp en una pestaña nueva.

Los textos editoriales están en sus secciones. Al cambiar de marca, actualiza también título y metadatos en `index.html` y el favicon en `public/favicon.svg`.

## Fotografías

Las fotografías actuales están en **`public/images/`**, con extensión `.jpg`. La carpeta `placeholders/` contiene únicamente los fallbacks SVG. La configuración conserva los nombres elegidos por el usuario:

| Uso en `spa.images`         | Archivo actual      | Fallback SVG                 |
| --------------------------- | ------------------- | ---------------------------- |
| hero                        | `spa-espacio.jpg`   | `spa-hero.svg`               |
| about                       | `spa-about.jpg`     | `spa-about.svg`              |
| massage                     | `spa-corporal.jpg`  | `treatment-massage.svg`      |
| facial                      | `masaje-facial.jpg` | `treatment-facial.svg`       |
| aromatherapy                | `spa-1.jpg`         | `treatment-aromatherapy.svg` |
| body                        | `spa-ritual.jpg`    | `treatment-body.svg`         |
| interior1                   | `spa-2.jpg`         | `spa-interior-1.svg`         |
| interior2                   | `spa-3.jpg`         | `spa-interior-2.svg`         |
| pausa inmersiva             | `spa-horizontal.jpg`| `spa-interior-2.svg`         |
| interior3                   | `spa-4.jpg`         | `spa-interior-3.svg`         |
| interior4                   | `spa-5.jpg`         | `spa-interior-4.svg`         |
| social1                     | `spa-3.jpg`         | `spa-social-1.svg`           |
| social2                     | `spa-2.jpg`         | `spa-social-2.svg`           |
| social3                     | `spa-3.jpg`         | `spa-social-3.svg`           |

Mantén el sujeto principal en la zona central y deja margen alrededor: `object-fit: cover` adapta el recorte en móvil y escritorio. El hero tiene prioridad de carga; las demás imágenes usan carga diferida. No hay imágenes remotas ni peticiones a servicios de imágenes.

**No necesitas editar componentes.** El plugin pequeño de `vite.config.ts` detecta los JPG existentes y actualiza la página al agregarlos o quitarlos durante desarrollo. En producción, vuelve a ejecutar el build y desplegar cuando añadas fotos; un alojamiento estático no puede detectar cambios del equipo local.

Los fallbacks se configuran por separado en el quinto argumento de `image()` en `site.ts`. Puedes cambiar el nombre de un JPG conservando su SVG de respaldo. `ImageWithFallback` también recupera el fallback si la foto está dañada. Se evitan solicitudes 404 cuando aún no hay fotos. Para regenerar las ilustraciones: `npm run placeholders`.

## Estructura

```text
src/
  components/
    layout/       Navbar y Footer
    sections/     Hero, Philosophy, Experiences, SensoryStatement,
                  AboutSpa, ImmersivePause, Gallery, Testimonials, WhatsAppCTA,
                  Location y SocialGallery
    ui/           ImageWithFallback, Reveal, SectionHeading, WhatsAppButton
  data/site.ts    Datos comerciales
  lib/            WhatsApp y foco del diálogo
  types/site.ts   Tipos del contenido
  App.tsx         Composición de la página
  index.css       Tokens, tipografía, layouts y responsive
public/
  images/placeholders/  13 SVG
  favicon.svg
scripts/          Generación reproducible de fallbacks
tests/            Pruebas de navegador y accesibilidad
```

## Diseño y decisiones

- Dirección Organic Luxury / Slow Wellness del brief, informada por la skill `ui-ux-pro-max`; la paleta y tipografías explícitas prevalecen sobre las recomendaciones automáticas.
- Cormorant Garamond y Manrope variables, servidas localmente; sin solicitudes a Google Fonts.
- Colores centralizados en `@theme`: ivory, deep sage, sand y clay. El texto secundario usa un tono ligeramente más oscuro que el propuesto para asegurar contraste.
- CSS e IntersectionObserver para animaciones de entrada, una sola vez. Sin Framer Motion, carruseles pesados, parallax ni rastreo del cursor.
- Menú con `dialog` nativo, cierre con Escape, foco contenido, retorno del foco, bloqueo de scroll y cierre al pasar a escritorio.
- Testimonios en columnas que pasan a una secuencia vertical en móvil; sin contenido oculto detrás de gestos.
- Los enlaces legales abren información demostrativa accesible. No se presentan como políticas definitivas.
- Iconos Lucide de interfaz; el acceso a Instagram usa una cámara genérica, no un logotipo de marca inventado.
- Sin backend, bases de datos, analítica, cookies propias, pagos, autenticación ni sistema de citas.

## Verificación

16 pruebas de navegador cubren:

- Anchos de 320, 375, 390, 430, 768, 1024, 1280, 1440 y 1920 px; ausencia de desbordamiento horizontal.
- Navegación, imágenes cargadas, ausencia de errores de consola y de solicitudes externas al abrir la landing.
- Enlaces y mensajes de WhatsApp centralizados.
- Menú móvil, tabulación, Escape, retorno del foco, scroll y cambio a escritorio.
- Enlaces legales y separación del botón flotante respecto al pie de página.
- Movimiento normal y `prefers-reduced-motion`, incluido cambio de preferencia en vivo.
- Auditoría axe WCAG A/AA en escritorio, móvil y menú abierto.
- Recuperación de todas las fotografías JPG mediante sus fallbacks SVG.
- Navegación activa y geometría estable al compactarse el navbar.

## Refinamiento Savia V2

La pasada con `impeccable` conserva paleta, fuentes, hero arqueado, textos, tratamientos y rutas fotográficas. Experiencias usa cuatro proporciones (4:5, 3:2, 5:6 y 2:1) con alternancia editorial; la galería tiene márgenes y alturas independientes; Instagram combina una imagen pequeña vertical, una protagonista desplazada y una horizontal. En móvil las fotografías recuperan el ancho útil y mantienen un escalonamiento moderado, sin carruseles ni controles nuevos.

`ImmersivePause.tsx`, entre Sobre Savia y Galería, utiliza `spa.images.immersive` (`spa-horizontal.jpg`) y conserva `spa-interior-2.svg` como fallback. El título es «Un refugio para bajar el ritmo».

`Reveal` admite variantes `text`, `image`, `fade` y `line`. Sus tiempos están centralizados en `src/index.css`: texto 650 ms, fotografía 850 ms, interacción 300 ms. Las fotos revelan su encuadre con una máscara y un zoom de 1.025 a 1; las líneas se dibujan mediante transformaciones. Todo aparece directamente con movimiento reducido. El navbar conserva su espacio en el documento al compactarse visualmente, para evitar saltos. No se añadieron dependencias.

La auditoría automática no reemplaza una revisión humana con lector de pantalla y un teléfono físico.

## Vercel y revisión manual

`vercel.json` define Vite, `npm run build` y `dist`. Se puede importar el repositorio en Vercel; no se requieren variables de entorno ni un servidor. El sitio no se ha desplegado desde esta tarea.

Antes de usarlo con un negocio real:

1. Sustituye teléfono, WhatsApp, Instagram, dirección, mapa y horarios ficticios. El número de muestra no corresponde a una cuenta verificada; los enlaces están bien formados, pero no se ha probado una conversación real.
2. Reemplaza fotografías, testimonios y textos legales. El mapa actual es una ilustración y el enlace abre Mazatlán, no un spa real.
3. Revisa los recortes de las fotografías y el resultado en un teléfono físico (Safari/Chrome).
4. Añade el dominio definitivo como canonical, `og:url` y una imagen Open Graph de 1200 × 630 px en `index.html` cuando exista. Se omiten URLs de dominio inventadas.
5. `public/robots.txt` impide el rastreo de esta demo. Retira esa restricción si quieres indexar una versión comercial.
