# Plasma Studios

Sitio de Plasma Studios. Hecho con [Astro](https://astro.build), Tailwind v4, GSAP y Lenis.

Léelo en [inglés](README.md).

## Tecnologías

- **Astro** (salida estática)
- **Tailwind CSS v4** — tokens de diseño (`--background`, `--foreground`, `--muted`, `--accent`, `--border`) en `src/styles/global.css`, cambio de tema vía `data-theme` en `<html>` (respeta la preferencia del sistema por defecto, override manual persistido en `localStorage`)
- **GSAP** (+ plugin `Flip`) — animación de intro en el inicio (el logo aparece centrado y se transforma en el logo del header con `Flip.fit`)
- **Lenis** — scroll suave, conectado al ticker de GSAP (`src/components/SmoothScroll.astro`)
- **Geist Sans / Geist Mono** — self-hosted vía `@fontsource`
- Íconos: SVGs de Phosphor inline (toggle de tema, menú móvil)

## Estructura

```
src/
  components/
    Header.astro        # nav + menú hamburguesa móvil, elementos del reveal de la intro
    LogoMark.astro       # SVG del logo compartido (currentColor, se adapta al tema)
    ThemeToggle.astro     # switch de tema fijo abajo a la izquierda
    SmoothScroll.astro    # Lenis + ticker de GSAP, cargado en todas las páginas
  data/
    team.json              # equipo que se muestra en /nosotros (schema abajo)
  layouts/
    Layout.astro            # <html>/<head>, script de tema, meta theme-color
  pages/
    index.astro              # inicio — animación de intro + hero
    nosotros.astro            # grid del equipo
    trabajo.astro
    contacto.astro
public/
  team/                       # acá van las imágenes de Discord del equipo
  favicon.svg, robots.txt
scripts/
  deploy.sh                   # build + deploy al VPS
```

## Desarrollo

```sh
npm install
npm run dev        # http://localhost:4321
npm run astro check
npm run build
npm run preview    # sirve el build de producción localmente
```

## Datos del equipo (`src/data/team.json`)

La página `/nosotros` lee este archivo y renderiza una card por cada entrada. El archivo del avatar de Discord va en `public/team/`; la cabeza de Minecraft se renderiza automáticamente a partir del nick usando [mc-heads.net](https://mc-heads.net).

```json
[
  {
    "name": "Nombre visible",
    "role": "Rol o descripción corta",
    "discordAvatar": "/team/archivo.png",
    "minecraftNick": "nick"
  }
]
```

Un array vacío muestra un placeholder de "equipo en construcción" en vez de cards rotas.

## Despliegue

```sh
bash scripts/deploy.sh
```

Compila el sitio y publica `dist/` en `/var/www/plasmastudios` en el VPS por SSH, usando el alias `plasma-vps` de `~/.ssh/config`. No hay credenciales guardadas en el repo ni en el script.

La configuración del servidor (nginx, ufw, TLS) se maneja directo en el VPS, no está versionada acá.

## SEO

`astro.config.mjs` tiene `site` apuntando a la IP del VPS por ahora — actualizalo cuando el proyecto tenga un dominio real, y volvé a correr `npm run build` para que el sitemap (`@astrojs/sitemap`) y el `robots.txt` apunten a la URL correcta.
