/**
 * Compress all images in public/images using sharp.
 * - PNGs → recompressed PNG (same filename, no code changes needed)
 * - WebPs → recompressed WebP
 * - JPEGs/JPGs → recompressed JPEG
 * - Max dimension: 1400px (keeps full quality for desktop retina)
 * Run: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, rename, writeFile, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const ROOT = new URL('../public/images', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MAX_DIM = 1400;
const SKIP_DIRS = ['diagnostics'];

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.includes(e.name)) await walk(full);
      continue;
    }
    const ext = extname(e.name).toLowerCase();
    if (!['.png', '.webp', '.jpg', '.jpeg'].includes(ext)) continue;

    const before = (await stat(full)).size;
    totalBefore += before;

    try {
      const img = sharp(full);
      const meta = await img.metadata();
      const needsResize = (meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM;
      let pipeline = needsResize
        ? img.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
        : img;

      let buf;
      if (ext === '.webp') {
        buf = await pipeline.webp({ quality: 78, effort: 5 }).toBuffer();
      } else if (ext === '.png') {
        buf = await pipeline.png({ compressionLevel: 9, palette: false }).toBuffer();
      } else {
        buf = await pipeline.jpeg({ quality: 82, progressive: true }).toBuffer();
      }

      // Only write if we actually saved space (don't bloat files)
      if (buf.length < before) {
        const tmp = full + '.tmp';
        await writeFile(tmp, buf);
        await unlink(full);
        await rename(tmp, full);
        const after = buf.length;
        totalAfter += after;
        const saving = (((before - after) / before) * 100).toFixed(0);
        console.log(`✓ ${basename(full).padEnd(52)} ${(before/1024).toFixed(0).padStart(6)}KB → ${(after/1024).toFixed(0).padStart(6)}KB  (-${saving}%)`);
        count++;
      } else {
        totalAfter += before;
      }
    } catch (err) {
      totalAfter += before;
      console.warn(`  skip ${e.name}: ${err.message}`);
    }
  }
}

console.log('Compressing images...\n');
await walk(ROOT);
const saved = totalBefore - totalAfter;
console.log(`\nDone. ${count} files compressed.`);
console.log(`Total: ${(totalBefore/1024/1024).toFixed(1)} MB → ${(totalAfter/1024/1024).toFixed(1)} MB  (saved ${(saved/1024/1024).toFixed(1)} MB)`);
