#!/bin/sh
set -eu
cd "$(dirname "$0")"
/bin/sh desktop/bridge/install-unix.sh
if command -v node >/dev/null; then exec node desktop/server.mjs; fi
exec xdg-open "$PWD/index.html"
