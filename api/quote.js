import { quotes } from "./quotesData.js";

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function handler(req, res) {
  const item = quotes[Math.floor(Math.random() * quotes.length)];

  const safeQuote = escapeXml(item.quote);
  const safeHighlight = escapeXml(item.highlight || "");
  const safeSub = escapeXml(item.sub);
  const safeAuthor = escapeXml(item.author);
  const safeRole = escapeXml(item.role);

  const formattedQuoteHtml = safeHighlight
    ? safeQuote.replace(
        safeHighlight,
        `<span style="color: ${item.color}; font-weight: 700;">${safeHighlight}</span>`
      )
    : safeQuote;

  // Compute responsive font size based on quote length
  const quoteLen = item.quote.length;
  let quoteFontSize = 24;
  let lineHeight = 1.35;
  if (quoteLen > 90) {
    quoteFontSize = 20;
    lineHeight = 1.3;
  } else if (quoteLen > 65) {
    quoteFontSize = 22;
    lineHeight = 1.35;
  }

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 230" width="1280" height="230" role="img" aria-label="Random Dev Quote">
  <title>Random Dev Quote</title>
  <defs>
    <style>
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
      .bold { font-weight: 700; }
    </style>

    <linearGradient id="cardbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#171a2c"/>
      <stop offset="100%" stop-color="#121423"/>
    </linearGradient>

    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity=".55"/>
      <stop offset="50%" stop-color="#262a42"/>
      <stop offset="100%" stop-color="#f472b6" stop-opacity=".55"/>
    </linearGradient>

    <linearGradient id="tagEdge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity=".4"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity=".4"/>
    </linearGradient>

    <linearGradient id="quoteMarkGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity=".35"/>
      <stop offset="100%" stop-color="#f472b6" stop-opacity=".25"/>
    </linearGradient>

    <linearGradient id="cyanPink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="50%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>

    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity=".18"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>

    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="11" cy="11" r=".8" fill="#ffffff" fill-opacity=".04"/>
    </pattern>
  </defs>

  <!-- Background container -->
  <rect width="1280" height="230" rx="24" fill="url(#cardbg)"/>
  <rect width="1280" height="230" rx="24" fill="url(#dots)"/>
  <rect x=".75" y=".75" width="1278.5" height="228.5" rx="23.25" fill="none" stroke="url(#edge)" stroke-width="1.5"/>

  <!-- Ambient Glow -->
  <ellipse cx="640" cy="120" rx="420" ry="90" fill="url(#glow)"/>

  <!-- Header bar -->
  <g transform="translate(48, 24)">
    <circle cx="8" cy="14" r="4.5" fill="#22d3ee"/>
    <text x="24" y="18" fill="#22d3ee" font-size="13" class="mono bold" letter-spacing="1.5">// RANDOM DEV QUOTE</text>

    <!-- Right LIVE FEED tag -->
    <rect x="1050" y="2" width="134" height="24" rx="12" fill="#1b1f36" stroke="url(#tagEdge)" stroke-width="1"/>
    <text x="1117" y="18" fill="#8d93ab" font-size="11.5" class="mono" text-anchor="middle">LIVE FEED ⚡</text>
  </g>

  <!-- Left Accent Bar -->
  <rect x="48" y="74" width="4.5" height="124" rx="2.25" fill="url(#cyanPink)"/>

  <!-- Large Quote Icon -->
  <g transform="translate(74, 80)">
    <path d="M0,40 C0,18 12,5 30,0 L35,7 C22,11 16,20 15,28 L32,28 L32,56 L0,56 Z M44,40 C44,18 56,5 74,0 L79,7 C66,11 60,20 59,28 L76,28 L76,56 L44,56 Z" fill="url(#quoteMarkGrad)"/>
  </g>

  <!-- Responsive HTML-in-SVG Quote Block (Zero text-overflow / cutting) -->
  <foreignObject x="175" y="60" width="1030" height="150">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="font-size: ${quoteFontSize}px; font-weight: 700; color: #eceef6; line-height: ${lineHeight}; letter-spacing: 0.2px; margin-bottom: 6px;">
          ${formattedQuoteHtml}
        </div>
        <div style="font-size: 14.5px; color: #9ba2be; line-height: 1.3; font-weight: 400;">
          ${safeSub}
        </div>
      </div>

      <!-- Author Pill Badge -->
      <div style="display: flex; align-items: center; gap: 14px; margin-top: 4px;">
        <div style="background: #1f233d; border: 1px solid #363c63; border-radius: 14px; padding: 4px 14px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12.5px; font-weight: 700; color: ${item.color};">
          — ${safeAuthor}
        </div>
        <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; color: #6f7697;">
          ${safeRole}
        </div>
      </div>
    </div>
  </foreignObject>
</svg>`;

  res.status(200).send(svg);
}
