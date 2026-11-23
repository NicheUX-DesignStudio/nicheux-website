// Pre-render the content pages to static HTML so crawlers (Google Search, AdSense) see real text
// without running JavaScript.
//
// How it works
//   1. Serve the current build (dist/) with Vite's preview server.
//   2. Open each content route in headless Chrome, scroll it so every reveal animation fires,
//      and save the rendered page body plus the Helmet head tags to prerender/pages/*.json.
//   3. vite build (scripts/vite-prerender-plugin.mjs) stitches those snapshots into dist/ so the
//      real HTML of each page is what gets served first. The React app then takes over exactly as before.
//   4. This script also rewrites the "rewrites" block in vercel.json so each route serves its snapshot.
//
// Run it from /project after any content change, before committing:
//     npm run release        (build, snapshot, build again)
//
// Needs Chrome or Edge installed. Set CHROME_PATH if it is somewhere unusual.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 4311;
const OUT = path.join(ROOT, "prerender", "pages");

const SERVICE_ROUTES = [
  "/strategy-design",
  "/web-development-ecommerce",
  "/print-brand-design",
  "/motion-design-ai-visuals",
  "/social-media-marketing",
  "/illustration-character-design",
];
const WORK_ROUTES = [
  "/featured-work",
  "/featured-work/bloom-brew",
  "/featured-work/nandhinidc",
  "/featured-work/kishore-portfolio",
  "/featured-work/ssjc-tournament",
  "/featured-work/sooraj-linkedin",
  "/featured-work/sooraj-wanted",
  "/featured-work/sooraj-candy-shop",
  "/featured-work/visual-communication",
  "/featured-work/conceptual-art",
  "/featured-work/sequential-art",
  "/featured-work/ai-canvas",
  "/featured-work/midas",
  "/featured-work/london-tube-reel",
];

const articles = fs.readFileSync(path.join(ROOT, "src/data/articles.ts"), "utf8");
const ARTICLE_ROUTES = [...articles.matchAll(/slug:\s*'([^']+)'/g)].map((m) => `/blog/${m[1]}`);

const ROUTES = ["/", ...SERVICE_ROUTES, "/blog", ...ARTICLE_ROUTES, ...WORK_ROUTES];

const fileFor = (route) => (route === "/" ? "index" : route.slice(1).replace(/\//g, "__"));

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) throw new Error("No Chrome or Edge found. Set CHROME_PATH.");
  return found;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function snapshot(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  // Ads and analytics are not needed to read the page, and ad frames would end up in the snapshot.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const u = req.url();
    if (/googlesyndication|doubleclick|googletagmanager|google-analytics|facebook\.net/.test(u)) req.abort();
    else req.continue();
  });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle2", timeout: 60000 });

  // Wait for real content (not the preloader, a spinner or a price still loading).
  await page.waitForFunction(
    () => {
      const main = document.getElementById("main-content") || document.querySelector("main");
      if (!main) return false;
      const text = main.innerText || "";
      return text.split(/\s+/).filter(Boolean).length > 120 && !text.includes("Loading...");
    },
    { timeout: 30000 }
  );

  // Scroll through the page so every "reveal on scroll" element fires, then come back to the top.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight + step; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
  });
  await sleep(1200);

  const result = await page.evaluate(() => {
    const root = document.getElementById("root");
    const head = [...document.head.querySelectorAll("[data-rh]")].map((e) => e.outerHTML);
    return {
      title: document.title,
      head,
      body: root.innerHTML,
      words: (root.innerText || "").split(/\s+/).filter(Boolean).length,
    };
  });
  await page.close();
  return result;
}

const distIndex = path.join(ROOT, "dist", "index.html");
if (!fs.existsSync(distIndex)) {
  console.error("dist/ not found. Run `npm run build` first (or use `npm run release`).");
  process.exit(1);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const server = await preview({ root: ROOT, preview: { port: PORT, strictPort: true, host: "127.0.0.1" } });
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ["--no-sandbox"] });

let failed = 0;
for (const route of ROUTES) {
  try {
    const snap = await snapshot(browser, route);
    if (snap.words < 120) throw new Error(`only ${snap.words} words`);
    if (/\b404\b|Page Not Found/i.test(snap.body.slice(0, 600))) throw new Error("looks like a 404");
    fs.writeFileSync(path.join(OUT, fileFor(route) + ".json"), JSON.stringify({ route, title: snap.title, head: snap.head, body: snap.body }));
    console.log(`ok   ${route}  (${snap.words} words, ${(snap.body.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    failed++;
    console.log(`FAIL ${route}  ${err.message}`);
  }
}

await browser.close();
await new Promise((r) => server.httpServer.close(r));

// Point each route at its snapshot in vercel.json. "/" is served from dist/index.html itself.
const vercelPath = path.join(ROOT, "vercel.json");
const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
const done = ROUTES.filter((r) => r !== "/" && fs.existsSync(path.join(OUT, fileFor(r) + ".json")));
vercel.rewrites = [
  { source: "/api/:path*", destination: "/api/server" },
  ...done.map((r) => ({ source: r, destination: `/_pre/${fileFor(r)}.html` })),
  { source: "/((?!api/|assets/).*)", destination: "/spa-shell.html" },
];
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + "\n");
fs.writeFileSync(path.join(ROOT, "prerender", "routes.json"), JSON.stringify(ROUTES.map((r) => ({ route: r, file: fileFor(r) })), null, 2) + "\n");

console.log(`\n${ROUTES.length - failed} of ${ROUTES.length} pages saved. vercel.json rewrites updated.`);
if (failed) process.exit(1);
