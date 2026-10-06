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
      count = "450+";
    }

    // 2. Render premium Cyberpunk themed banner badge
    const label = "CYBER VIEWS";
    const formattedCount = isNaN(count) ? count : Number(count).toLocaleString();
    const width = 230;
    const height = 40;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}: ${formattedCount}">
  <title>${label}: ${formattedCount}</title>
  <defs>
    <linearGradient id="cyberBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#171a2c"/>
      <stop offset="100%" stop-color="#0d0e16"/>
    </linearGradient>
    <linearGradient id="cyberBorder" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="pillGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .sans { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
    .pulse { animation: pulseAnim 2s infinite ease-in-out; }
    @keyframes pulseAnim {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }
  </style>

  <!-- Container Base -->
  <rect width="${width}" height="${height}" rx="10" fill="url(#cyberBg)"/>
  <rect x="0.75" y="0.75" width="${width - 1.5}" height="${height - 1.5}" rx="9.25" fill="none" stroke="url(#cyberBorder)" stroke-width="1.5"/>

  <!-- Left Cyber Indicator Dot & Label -->
  <circle cx="18" cy="20" r="4" fill="#22d3ee" filter="url(#neonGlow)" class="pulse"/>
  <circle cx="18" cy="20" r="2" fill="#ffffff"/>
  
  <text x="30" y="24" class="sans" font-size="11" fill="#94a3b8" letter-spacing="1.5">VIEWS</text>

  <!-- Counter Pill Badge -->
  <g transform="translate(132, 7)">
    <rect width="88" height="26" rx="6" fill="#121526" stroke="#22d3ee" stroke-width="1" stroke-opacity="0.5"/>
    <text x="44" y="17.5" text-anchor="middle" class="mono" font-size="12" font-weight="700" fill="#22d3ee" filter="url(#neonGlow)">
      ${formattedCount}
    </text>
  </g>
</svg>`;

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0");
    res.setHeader("CDN-Cache-Control", "no-store");
    res.setHeader("Vercel-CDN-Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).send(svg);
  } catch (err) {
    res.status(500).send(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="36"><rect width="160" height="36" rx="6" fill="#0d0e16"/><text x="80" y="22" fill="#22d3ee" text-anchor="middle" font-size="12" font-family="monospace">VIEWS: 450+</text></svg>`);
  }
}
