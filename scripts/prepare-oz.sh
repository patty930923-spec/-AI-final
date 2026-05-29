#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/deploy/oz"

mkdir -p "$DEST"
cp "$ROOT/index.html" "$ROOT/styles.css" "$ROOT/app.js" "$DEST/"
if [[ -f "$DEST/config.js" ]]; then
  cp "$DEST/config.js" "$DEST/config.js.bak"
fi
cp "$ROOT/config.oz.example.js" "$DEST/config.js"
if [[ -f "$DEST/config.js.bak" ]]; then
  mv "$DEST/config.js.bak" "$DEST/config.js"
fi

cat <<EOF

✓ 已產生 OZ 上傳包：deploy/oz/

請編輯 deploy/oz/config.js ，填入 Vercel 網址後，
用 FTP 上傳 deploy/oz/ 內全部檔案到 ~/WWW/

詳見 DEPLOY-OZ.md

EOF
