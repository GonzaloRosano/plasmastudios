# Plasma Studios

Marketing site for Plasma Studios. Built with [Astro](https://astro.build), Tailwind v4, GSAP and Lenis.

Read this in [Español](README.es.md).

![Screenshot](https://api.microlink.io/?url=https%3A%2F%2Fplasmastudios.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=10000)

## Stack

- **Astro** (static output)
- **Tailwind CSS v4** — design tokens (`--background`, `--foreground`, `--muted`, `--accent`, `--border`) in `src/styles/global.css`, theme switching via `data-theme` on `<html>` (system preference by default, manual override persisted in `localStorage`)
- **GSAP** (+ `Flip` plugin) — the homepage intro animation (logo grows in centered, then morphs into the header logo via `Flip.fit`)
- **Lenis** — smooth scroll, wired through the GSAP ticker (`src/components/SmoothScroll.astro`)
- **Geist Sans / Geist Mono** — self-hosted via `@fontsource`
- Icons: inline Phosphor SVGs (theme toggle, mobile menu)

## Structure

```
src/
  components/
    Header.astro       # nav + mobile hamburger menu, intro reveal targets
    LogoMark.astro      # shared logo SVG (currentColor, adapts to theme)
    ThemeToggle.astro    # fixed bottom-left theme switch
    SmoothScroll.astro   # Lenis + GSAP ticker, loaded on every page
  data/
    team.json            # team members shown on /nosotros (see schema below)
  layouts/
    Layout.astro          # <html>/<head>, theme script, theme-color meta
  pages/
    index.astro            # home — intro animation + hero
    nosotros.astro          # team grid
    trabajo.astro
    contacto.astro
public/
  team/                     # put team member avatar images here
  favicon.svg, robots.txt
scripts/
  deploy.sh                 # build + rsync-style deploy to the VPS
```

## Development

```sh
npm install
npm run dev        # http://localhost:4321
npm run astro check
npm run build
npm run preview    # serve the production build locally
```

## Team data (`src/data/team.json`)

The `/nosotros` page reads this file and renders one card per entry. Each Discord avatar file goes in `public/team/`; the Minecraft head is rendered automatically from the nick via [mc-heads.net](https://mc-heads.net).

```json
[
  {
    "name": "Display name",
    "role": "Short role/description",
    "discordAvatar": "/team/filename.png",
    "minecraftNick": "nick"
  }
]
```

An empty array renders a "team under construction" placeholder instead of broken cards.

## Deploy

```sh
bash scripts/deploy.sh
```

Builds the site and publishes `dist/` to `/var/www/plasmastudios` on the VPS over SSH, using the `plasma-vps` alias from `~/.ssh/config`. No credentials are stored in the repo or the script.

Server-side (nginx, ufw, TLS) is configured directly on the VPS, not tracked here.

## SEO

`astro.config.mjs` sets `site` to the VPS IP for now — update it once the project has a real domain, then re-run `npm run build` so the sitemap (`@astrojs/sitemap`) and `robots.txt` point at the right URL.
