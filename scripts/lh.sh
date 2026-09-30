#!/bin/zsh
# Usage: scripts/lh.sh <mobile|desktop> <runs> path1 path2 ...   (BASE env overrides the host)
# Prints median scores per page; reports saved to audit/final/<preset>/.
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
preset=$1; runs=$2; shift 2
BASE=${BASE:-http://localhost:4321}
mkdir -p audit/final/$preset
for p in "$@"; do
  n=${p#/}; n=${n//\//__}; n=${n:-home}
  for i in $(seq 1 $runs); do
    flags=(); [ $preset = desktop ] && flags=(--preset=desktop)
    npx lighthouse "$BASE$p" --quiet $flags --chrome-flags="--headless=new" --output=json --output-path="audit/final/$preset/$n.$i.json" >/dev/null 2>&1
  done
  node scripts/lh-median.mjs "audit/final/$preset/$n" $runs "$p"
done
