export default async function handler(req, res) {
  try {
    // 1. Fetch live count from komarev upstream with timeout
    let count = "450+";
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const upstream = await fetch(
        "https://komarev.com/ghpvc/?username=kumarjaikishan&color=0284c7&style=for-the-badge&label=VIEWS",
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            "Accept": "image/svg+xml,image/*,*/*"
          },
          signal: controller.signal
        }
      );
      clearTimeout(timeoutId);

      if (upstream.ok) {
        const svgText = await upstream.text();
        const match = svgText.match(/aria-label=["'](?:VIEWS|PROFILE VIEWS):\s*(\d+)["']/i) || svgText.match(/>(\d+)<\/text>/);
        if (match && match[1]) {
          count = match[1];
        }
      }
    } catch (e) {
      // Fallback gracefully to base count if komarev is unreachable/rate-limited
      count = "450+";
    }

    // 2. Render premium Cyberpunk / Shields badge matching your theme
    const label = "PROFILE VIEWS";
    const labelBg = "#0d0e16";
    const valueBg = "#0284c7";
    const labelWidth = 104;
    const valueWidth = Math.max(48, count.length * 9 + 18);
    const totalWidth = labelWidth + valueWidth;
    const height = 28;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" role="img" aria-label="${label}: ${count}">
  <title>${label}: ${count}</title>
  <clipPath id="r">
    <rect width="${totalWidth}" height="${height}" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="${height}" fill="${labelBg}"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="${height}" fill="${valueBg}"/>
    <rect width="${totalWidth}" height="${height}" fill="url(#g)" opacity="0.1"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="11">
    <text aria-hidden="true" x="${labelWidth / 2}" y="19" fill="#010101" fill-opacity=".3" font-weight="bold">${label}</text>
    <text x="${labelWidth / 2}" y="18" font-weight="bold">${label}</text>
    <text aria-hidden="true" x="${labelWidth + valueWidth / 2}" y="19" fill="#010101" fill-opacity=".3" font-weight="bold">${count}</text>
    <text x="${labelWidth + valueWidth / 2}" y="18" font-weight="bold">${count}</text>
  </g>
</svg>`;

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0");
    res.setHeader("CDN-Cache-Control", "no-store");
    res.setHeader("Vercel-CDN-Cache-Control", "no-store");
    res.status(200).send(svg);
  } catch (err) {
    res.status(500).send(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="28"><rect width="150" height="28" fill="#0d0e16"/><text x="75" y="18" fill="#fff" text-anchor="middle" font-size="11" font-family="sans-serif">PROFILE VIEWS: 450+</text></svg>`);
  }
}
