#!/usr/bin/env bash
# Screen-record a local walkthrough of the built app (funky theme demo).
# Requires: DISPLAY with X11, ffmpeg, google-chrome, xdotool, curl.
# Usage: DISPLAY=:1 ./scripts/record-theme-walkthrough.sh [output.mp4] [duration_sec]
set -euo pipefail
export DISPLAY="${DISPLAY:-:1}"
BASE="http://127.0.0.1:4173"
OUT="${1:-/opt/cursor/artifacts/funky-theme-walkthrough.mp4}"
DURATION="${2:-52}"

cd "$(dirname "$0")/.."
npm run build --silent
npx vite preview --port 4173 --host 127.0.0.1 &
PREVIEW_PID=$!
cleanup() {
  kill "${PREVIEW_PID}" 2>/dev/null || true
}
trap cleanup EXIT

for _ in $(seq 1 40); do
  if curl -s -o /dev/null -w "%{http_code}" "${BASE}/" | grep -q 200; then
    break
  fi
  sleep 0.25
done

mkdir -p "$(dirname "$OUT")"

ffmpeg -y -f x11grab -video_size 1920x1200 -framerate 15 -i "${DISPLAY}.0" \
  -t "${DURATION}" \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 -preset fast -crf 24 -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUT" &
FF_PID=$!

sleep 1.2

google-chrome "about:blank" \
  --new-window \
  --window-size=1440,900 \
  --window-position=240,150 \
  --user-data-dir=/tmp/chrome-walkthrough-profile \
  --no-first-run \
  --disable-extensions \
  --disable-infobars \
  --disable-background-networking \
  --no-default-browser-check \
  --ignore-certificate-errors \
  --disable-dev-shm-usage \
  --no-sandbox \
  &
CHROME_PID=$!

sleep 2.5
WID=""
for _ in $(seq 1 40); do
  WID=$(xdotool search --class "Google-chrome" 2>/dev/null | tail -1)
  if [[ -n "${WID}" ]]; then break; fi
  sleep 0.2
done
if [[ -z "${WID}" ]]; then
  echo "Could not find Chrome window" >&2
  exit 1
fi
xdotool windowactivate --sync "$WID"
sleep 0.4

xdotool key --window "$WID" ctrl+l
sleep 0.35
xdotool type --window "$WID" --delay 3 "${BASE}/"
xdotool key --window "$WID" Return
sleep 2.2
xdotool key --window "$WID" Page_Down
sleep 0.9
xdotool key --window "$WID" Page_Down
sleep 0.9
xdotool key --window "$WID" Page_Down
sleep 1

xdotool key --window "$WID" ctrl+l
sleep 0.35
xdotool type --window "$WID" --delay 2 "${BASE}/products?category=outerwear"
xdotool key --window "$WID" Return
sleep 2.5
xdotool key --window "$WID" Page_Down
sleep 0.8
xdotool key --window "$WID" Page_Down
sleep 1

xdotool key --window "$WID" ctrl+l
sleep 0.35
xdotool type --window "$WID" --delay 2 "${BASE}/products/ridgeline-shell-jacket"
xdotool key --window "$WID" Return
sleep 2.5
xdotool key --window "$WID" Page_Down
sleep 0.8
xdotool key --window "$WID" Page_Down
sleep 1

xdotool key --window "$WID" ctrl+l
sleep 0.35
xdotool type --window "$WID" --delay 2 "${BASE}/about"
xdotool key --window "$WID" Return
sleep 2.2
xdotool key --window "$WID" Page_Down
sleep 0.8
xdotool key --window "$WID" Home
sleep 0.5

xdotool key --window "$WID" ctrl+l
sleep 0.35
xdotool type --window "$WID" --delay 3 "${BASE}/"
xdotool key --window "$WID" Return
sleep 2

wait "$FF_PID" || true
kill "$CHROME_PID" 2>/dev/null || true

ls -la "$OUT"
