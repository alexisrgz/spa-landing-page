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
Las pruebas usan el puerto 5198 y nunca reutilizan servidores ajenos. Las capturas quedan en `test-results/` (ignorado por Git). La prueba de reemplazo usa una imagen temporal y la elimina al terminar; se omite si ya existe una foto real.

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

Coloca estos archivos directamente en **`public/images/`**. Respeta los nombres, minúsculas y extensión `.webp`.

| Archivo exacto                | Dimensiones recomendadas | Proporción |
| ----------------------------- | ------------------------ | ---------- |
| `spa-hero.webp`               | 1400 × 1700 px           | 14:17      |
| `spa-about.webp`              | 1000 × 1200 px           | 5:6        |
| `treatment-massage.webp`      | 1200 × 900 px            | 4:3        |
| `treatment-facial.webp`       | 1200 × 900 px            | 4:3        |
| `treatment-aromatherapy.webp` | 1200 × 900 px            | 4:3        |
| `treatment-body.webp`         | 1200 × 900 px            | 4:3        |
| `spa-interior-1.webp`         | 1200 × 1500 px           | 4:5        |
| `spa-interior-2.webp`         | 1600 × 1000 px           | 8:5        |
| `spa-interior-3.webp`         | 900 × 1000 px            | 9:10       |
| `spa-interior-4.webp`         | 900 × 1000 px            | 9:10       |
| `spa-social-1.webp`           | 1000 × 1000 px           | 1:1        |
| `spa-social-2.webp`           | 1000 × 1000 px           | 1:1        |
| `spa-social-3.webp`           | 1000 × 1000 px           | 1:1        |

Mantén el sujeto principal en la zona central y deja margen alrededor: `object-fit: cover` adapta el recorte en móvil y escritorio. El hero tiene prioridad de carga; las demás imágenes usan carga diferida. No hay imágenes remotas ni peticiones a servicios de imágenes.

**No necesitas editar componentes.** El plugin pequeño de `vite.config.ts` detecta los WebP existentes y actualiza la página al agregarlos o quitarlos durante desarrollo. En producción, vuelve a ejecutar el build y desplegar cuando añadas fotos; un alojamiento estático no puede detectar cambios del equipo local.

Cada archivo tiene un fallback con el mismo nombre y extensión `.svg` en `public/images/placeholders/`: 13 ilustraciones locales de interiores, lino, cerámica y esencias. `ImageWithFallback` también recupera el fallback si la foto está dañada. Se evitan solicitudes 404 cuando aún no hay fotos. Para regenerar las ilustraciones: `npm run placeholders`.

## Estructura

```text
src/
  components/
    layout/       Navbar y Footer
    sections/     Hero, Philosophy, Experiences, SensoryStatement,
                  AboutSpa, Gallery, Testimonials, WhatsAppCTA,
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
 tests/           Pruebas de navegador y accesibilidad
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

15 pruebas de navegador cubren:

- Anchos de 320, 375, 390, 430, 768, 1024, 1280, 1440 y 1920 px; ausencia de desbordamiento horizontal.
- Navegación, imágenes cargadas, ausencia de errores de consola y de solicitudes externas al abrir la landing.
- Enlaces y mensajes de WhatsApp centralizados.
- Menú móvil, tabulación, Escape, retorno del foco, scroll y cambio a escritorio.
- Enlaces legales y separación del botón flotante respecto al pie de página.
- Movimiento normal y `prefers-reduced-motion`, incluido cambio de preferencia en vivo.
- Auditoría axe WCAG A/AA en escritorio, móvil y menú abierto.
- Incorporación automática de WebP y recuperación ante imagen dañada.

La auditoría automática no reemplaza una revisión humana con lector de pantalla y un teléfono físico.

## Vercel y revisión manual

`vercel.json` define Vite, `npm run build` y `dist`. Se puede importar el repositorio en Vercel; no se requieren variables de entorno ni un servidor. El sitio no se ha desplegado desde esta tarea.

Antes de usarlo con un negocio real:

1. Sustituye teléfono, WhatsApp, Instagram, dirección, mapa y horarios ficticios. El número de muestra no corresponde a una cuenta verificada; los enlaces están bien formados, pero no se ha probado una conversación real.
2. Reemplaza fotografías, testimonios y textos legales. El mapa actual es una ilustración y el enlace abre Mazatlán, no un spa real.
3. Revisa los recortes de las fotografías y el resultado en un teléfono físico (Safari/Chrome).
4. Añade el dominio definitivo como canonical, `og:url` y una imagen Open Graph de 1200 × 630 px en `index.html` cuando exista. Se omiten URLs de dominio inventadas.
5. `public/robots.txt` impide el rastreo de esta demo. Retira esa restricción si quieres indexar una versión comercial.
