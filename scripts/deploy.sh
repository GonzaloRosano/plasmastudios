#!/usr/bin/env bash
# Deploya el build estatico de Astro al VPS de Plasma Studios.
# Requiere el alias SSH "onasor-vps" ya configurado en ~/.ssh/config.
set -euo pipefail

REMOTE_HOST="onasor-vps"
REMOTE_DIR="/var/www/plasmastudios"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Instalando dependencias"
cd "$PROJECT_DIR"
npm ci

echo "==> Build de produccion"
npm run build

echo "==> Empaquetando dist/"
TMP_TAR="$(mktemp -u).tar.gz"
tar -czf "$TMP_TAR" -C dist .

echo "==> Subiendo a $REMOTE_HOST"
scp "$TMP_TAR" "$REMOTE_HOST:/tmp/plasmastudios-deploy.tar.gz"

echo "==> Publicando en $REMOTE_DIR"
ssh "$REMOTE_HOST" "
  set -e
  sudo mkdir -p $REMOTE_DIR
  sudo find $REMOTE_DIR -mindepth 1 -delete
  sudo tar -xzf /tmp/plasmastudios-deploy.tar.gz -C $REMOTE_DIR
  sudo chown -R www-data:www-data $REMOTE_DIR
  rm -f /tmp/plasmastudios-deploy.tar.gz
"

rm -f "$TMP_TAR"
echo "==> Listo: http://169.58.226.205/"
