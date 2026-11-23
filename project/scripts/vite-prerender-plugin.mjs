// After `vite build`, stitch the saved page snapshots (prerender/pages/*.json) into dist/.
//   dist/index.html            the home page snapshot inside the normal built shell
//   dist/_pre/<route>.html     one file per other content route (vercel.json rewrites point here)
//   dist/spa-shell.html        the untouched shell, used for every other URL and for 404s
// If prerender/pages does not exist, the build is exactly the old single-page app.

import fs from "node:fs";
import path from "node:path";

export default function prerenderPlugin() {
  let outDir = "dist";
  let root = process.cwd();
  return {
    name: "nicheux-prerender",
    apply: "build",
    configResolved(cfg) {
      outDir = path.resolve(cfg.root, cfg.build.outDir);
      root = cfg.root;
    },
    closeBundle() {
      const pagesDir = path.join(root, "prerender", "pages");
      const shellPath = path.join(outDir, "index.html");
      if (!fs.existsSync(pagesDir) || !fs.existsSync(shellPath)) return;

      const shell = fs.readFileSync(shellPath, "utf8");
      fs.writeFileSync(path.join(outDir, "spa-shell.html"), shell);

      const compose = (page) => {
        let html = shell;
        // Drop the shell's own title and Helmet-managed tags, then add the page's.
        html = html.replace(/<title>[\s\S]*?<\/title>\s*/, "");
        html = html.replace(/<(meta|link)\s+data-rh="true"[^>]*>\s*/g, "");
        const headTags = `<title>${page.title}</title>\n    ${page.head.join("\n    ")}\n  `;
        html = html.replace("</head>", () => headTags + "</head>");
        // The snapshot is inside #root. The preloader overlay still covers it until React mounts,
        // and nx-ready makes the text visible to crawlers that do not run scripts.
        html = html.replace('<div id="root"></div>', () => `<div id="root" class="nx-ready">${page.body}</div>`);
        return html;
      };

      let count = 0;
      for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json"))) {
        const page = JSON.parse(fs.readFileSync(path.join(pagesDir, file), "utf8"));
        const html = compose(page);
        if (page.route === "/") {
          fs.writeFileSync(shellPath, html);
        } else {
          const target = path.join(outDir, "_pre", file.replace(/\.json$/, ".html"));
          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.writeFileSync(target, html);
        }
        count++;
      }
      console.log(`[prerender] stitched ${count} page snapshots into ${path.relative(root, outDir)}/`);
    },
  };
}
