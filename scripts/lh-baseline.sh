#!/bin/zsh
# Mobile Lighthouse (default = Moto G Power emulation, simulated slow 4G) on core pages.
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
B=https://www.levelupcincinnati.org
for p in "" our-vision become-a-coach our-partners students our-team aiming-for-opportunity aiming-for-opportunity/what-to-expect urban-bourbon herizon-series donate elevating-women your-year-as-a-coach coach-profiles join-the-network-archive level-up-coaches-directory level-up-scholar-directory-blog level-up-coaches-directory/jessica-king custom-404-page privacy-policy; do
  n=${p//\//__}; n=${n:-home}
  npx lighthouse "$B/$p" --quiet --chrome-flags="--headless=new" --output=json --output=html --output-path="audit/baseline/$n" >/dev/null 2>&1
  node -e 'const r=require("./audit/baseline/'$n'.report.json");const c=r.categories,a=r.audits;console.log(["'$n'",...["performance","accessibility","best-practices","seo"].map(k=>Math.round(c[k].score*100)),a["largest-contentful-paint"].displayValue,a["total-blocking-time"].displayValue,Math.round(a["total-byte-weight"].numericValue/1024)+"KiB"].join("\t"))'
done
