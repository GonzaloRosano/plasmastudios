<div align="center">

# Plasma Studios

Sitio web bilingüe de Plasma Studios: diseño, desarrollo y comunidad.

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?logo=threedotjs&logoColor=white)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](LICENSE)

[Sitio en vivo](https://plasmastudios.vercel.app) | [English](README.md) | Español

</div>

![Screenshot](https://raw.githubusercontent.com/GonzaloRosano/plasmastudios/master/docs/screenshot.webp)

## Acerca de

Sitio estático de Plasma Studios, hecho con Astro. Está disponible en español e inglés (`/es/` y `/en/`); la página raíz redirige según el idioma del navegador y usa español por defecto.

## Funcionalidades

- Página de inicio con sección hero y resumen del equipo.
- Página del equipo (`/nosotros`) con una card por integrante, etiquetas de rol, filtro por rol y un perfil por integrante (`/nosotros/<id>`) escrito en Markdown.
- Páginas Trabajo y Contacto (por ahora son placeholders).
- Tema claro y oscuro: sigue la preferencia del sistema por defecto; la elección manual se guarda en `localStorage`.
- Logo animado con Three.js, transiciones de página con GSAP y scroll suave con Lenis.
- Sitemap generado con `@astrojs/sitemap`.

## Tecnologías

| Área | Tecnología |
| --- | --- |
| Framework | Astro 7 (salida estática), TypeScript |
| Estilos | Tailwind CSS 4 (tokens de diseño en `src/styles/global.css`) |
| Animación | GSAP (con ScrollTrigger), Lenis |
| 3D | Three.js |
| Fuentes | Geist Sans, Geist Mono, Space Grotesk (`@fontsource`, self-hosted) |
| Íconos | Phosphor (`@phosphor-icons/core`) |
| Contenido | Colección de contenido de Astro (`src/content/team`) y `src/data/team.json` |

## Desarrollo

Requiere Node.js 22.12 o superior.

```sh
npm install
npm run dev        # http://localhost:4321
npm run astro check
npm run build
npm run preview    # sirve el build de producción localmente
```

`npm run build` ejecuta antes `scripts/sync-team-roles.mjs` (`prebuild`). Actualiza el campo `tags` de `src/data/team.json` con los roles del servidor de Discord cuando `DISCORD_BOT_TOKEN` y `DISCORD_GUILD_ID` están definidos (sirve un archivo `.env`). Sin ellos, o ante cualquier error, se omite y el build sigue con el archivo versionado.

## Datos del equipo

La página del equipo lee `src/data/team.json` (22 integrantes por ahora). Ejemplo de entrada:

```json
{
  "name": "Nombre visible",
  "role": "",
  "discordAvatar": "/team/archivo.png",
  "profileUrl": "https://discord.com/users/<id>",
  "id": "archivo",
  "tags": ["Builder", "Web Developer"],
  "ceo": false
}
```

- Los avatares van en `public/team/`.
- Cada integrante tiene un perfil en `src/content/team/<id>.md` (inglés) y `src/content/team/<id>.es.md` (español).
- Un array vacío muestra un placeholder de "equipo en construcción".

## SEO y hosting

El sitio está publicado en [plasmastudios.vercel.app](https://plasmastudios.vercel.app).

Pendiente conocido: `site` en `astro.config.mjs` y la línea `Sitemap` de `public/robots.txt` todavía apuntan a `http://169.58.226.205` (el VPS anterior). Hay que cambiar ambos por el dominio real y volver a compilar para que el sitemap y `robots.txt` usen la URL correcta.

`scripts/deploy.sh` es el script original de despliegue al VPS: compila el sitio y sube `dist/` a `/var/www/plasmastudios` por SSH usando el alias `plasma-vps` de `~/.ssh/config`. No guarda credenciales.

## Licencia

[MIT](LICENSE) - Gonzalo Rosano.
