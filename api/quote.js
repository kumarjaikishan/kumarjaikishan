const quotes = [
  {
    quote: "Talk is cheap. Show me the code.",
    highlight: "Show me the code.",
    sub: "Delivering real solutions through clean, reliable and test-driven code.",
    author: "Linus Torvalds",
    role: "Linux & Git Creator",
    color: "#22d3ee"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    highlight: "solve the problem.",
    sub: "Architecting smart logic and scalable systems before typing the first line.",
    author: "John Johnson",
    role: "Software Architect",
    color: "#f472b6"
  },
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    highlight: "When you have to explain it, it's bad.",
    sub: "Writing expressive, intuitive code and self-documenting architectures.",
    author: "Cory House",
    role: "React & JS Architect",
    color: "#a78bfa"
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    highlight: "prerequisite for reliability.",
    sub: "Eliminating needless complexity to build robust, maintainable systems.",
    author: "Edsger W. Dijkstra",
    role: "Computer Scientist",
    color: "#38bdf8"
  },
  {
    quote: "Make it work, make it right, make it fast.",
    highlight: "make it fast.",
    sub: "Iterative development with a focus on correctness and performance.",
    author: "Kent Beck",
    role: "Creator of XP & TDD",
    color: "#34d399"
  },
  {
    quote: "Clean code always looks like it was written by someone who cares.",
    highlight: "someone who cares.",
    sub: "Crafting maintainable, readable codebases with high standards.",
    author: "Robert C. Martin",
    role: "Uncle Bob",
    color: "#fb923c"
  },
  {
    quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    highlight: "write code that humans can understand.",
    sub: "Prioritizing maintainability and human collaboration over clever obscurity.",
    author: "Martin Fowler",
    role: "Author & Speaker",
    color: "#22d3ee"
  },
  {
    quote: "Experience is the name everyone gives to their mistakes.",
    highlight: "gives to their mistakes.",
    sub: "Embracing bugs as growth opportunities and stepping stones to mastery.",
    author: "Oscar Wilde",
    role: "Philosopher & Poet",
    color: "#ec4899"
  },
  {
    quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
    highlight: "written for people to read,",
    sub: "Writing clean abstractions and self-documenting code.",
    author: "Harold Abelson",
    role: "MIT Professor & Author",
    color: "#a855f7"
  }
];

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function handler(req, res) {
  const item = quotes[Math.floor(Math.random() * quotes.length)];

  // Escape XML characters first
  const safeQuote = escapeXml(item.quote);
  const safeHighlight = escapeXml(item.highlight || "");
  const safeSub = escapeXml(item.sub);
  const safeAuthor = escapeXml(item.author);
  const safeRole = escapeXml(item.role);

  const quoteFormatted = safeHighlight
    ? safeQuote.replace(safeHighlight, `<tspan fill="${item.color}">${safeHighlight}</tspan>`)
    : safeQuote;

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
      .sg { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
      .sgm { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 400; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
      .bold { font-weight: 700; }
    </style>

    <linearGradient id="cardbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#171a2c"/>
      <stop offset="1%" stop-color="#121423"/>
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

  <!-- Quote & Author Content -->
  <g transform="translate(175, 68)">
    <text x="0" y="44" fill="#eceef6" font-size="26" class="sg" letter-spacing="0.2">
      ${quoteFormatted}
    </text>
    <text x="0" y="80" fill="#9ba2be" font-size="16" class="sgm">
      ${safeSub}
    </text>

    <!-- Author Badge -->
    <g transform="translate(0, 102)">
      <rect x="0" y="0" width="${item.author.length * 9.5 + 40}" height="28" rx="14" fill="#1f233d" stroke="#363c63" stroke-width="1"/>
      <text x="16" y="19" fill="${item.color}" font-size="13" class="mono bold">— ${safeAuthor}</text>
      <text x="${item.author.length * 9.5 + 56}" y="19" fill="#6f7697" font-size="13" class="mono">${safeRole}</text>
    </g>
  </g>
</svg>`;

  res.status(200).send(svg);
}
