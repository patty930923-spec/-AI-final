#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/deploy/oz"

mkdir -p "$DEST"
cp "$ROOT/public/index.html" "$ROOT/public/styles.css" "$ROOT/public/app.js" "$DEST/"
cp "$ROOT/public/config.js" "$DEST/config.js"

cat <<EOF

✓ 已產生 OZ 上傳包：deploy/oz/

請編輯 deploy/oz/config.js ，填入 Vercel 網址後，
用 FTP 上傳 deploy/oz/ 內全部檔案到 ~/WWW/

詳見 DEPLOY-OZ.md

EOF
