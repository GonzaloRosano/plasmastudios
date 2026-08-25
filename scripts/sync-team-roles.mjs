// Sincroniza el campo "tags" de team.json con los roles reales del server
// de Discord antes de cada build. Si no hay DISCORD_BOT_TOKEN/DISCORD_GUILD_ID
// configurados, se salta sin romper el build (útil en dev o CI sin el token).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

try {
  process.loadEnvFile();
} catch {
  // sin .env, seguimos con las env vars que ya estén en el proceso
}

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

if (!TOKEN || !GUILD_ID) {
  console.log('[sync-team-roles] DISCORD_BOT_TOKEN o DISCORD_GUILD_ID no seteados, se omite la sincronización.');
  process.exit(0);
}

const TEAM_JSON_PATH = fileURLToPath(new URL('../src/data/team.json', import.meta.url));

// Roles de skill/rol de trabajo del server (los que se muestran como tags).
// Roles de rango (PLASMA MEMBERS, C.E.O.S, etc.) quedan afuera a propósito.
const WHITELIST = new Set([
  'Builder', 'Configurador', 'Configurador Mythic', 'Configurador ConditionalEvents',
  'Animador', 'Artista PixelArt', 'DC Builder', 'Mod developer', 'Musico', 'LoreMaker',
  'Web Developer', 'Render Artist', 'Modelador Blockbench', 'Artista 3D',
  'Overlay Developer', 'Editor de video', 'Editor de imagenes',
]);

function clean(name) {
  return name.replace(/^[・\s]+/, '').trim();
}

async function discordGet(path) {
  const res = await fetch(`https://discord.com/api/v10${path}`, {
    headers: { Authorization: `Bot ${TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`Discord API ${path} -> ${res.status} ${await res.text()}`);
  }
  return res.json();
}

const team = JSON.parse(readFileSync(TEAM_JSON_PATH, 'utf-8'));

const roles = await discordGet(`/guilds/${GUILD_ID}/roles`);
const roleById = new Map(roles.map((r) => [r.id, r.name]));

for (const member of team) {
  const discordId = member.profileUrl?.split('/').pop();
  if (!discordId) continue;

  let guildMember;
  try {
    guildMember = await discordGet(`/guilds/${GUILD_ID}/members/${discordId}`);
  } catch (err) {
    console.warn(`[sync-team-roles] no se pudo leer a ${member.id} (${discordId}): ${err.message}`);
    continue;
  }

  member.tags = guildMember.roles
    .map((id) => clean(roleById.get(id) ?? ''))
    .filter((name) => WHITELIST.has(name));

  // Discord rate limit friendly
  await new Promise((r) => setTimeout(r, 300));
}

writeFileSync(TEAM_JSON_PATH, JSON.stringify(team, null, 2) + '\n', 'utf-8');
console.log(`[sync-team-roles] tags actualizados para ${team.length} personas.`);
