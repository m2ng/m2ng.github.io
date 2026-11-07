// Tiny self-contained static file server for local preview (Bun.serve).
// Serves the build output (../../build) so the CV can be opened in a browser.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat } from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.env.CV_OUT || path.join(__dirname, '../../build'));
const port = Number(process.env.PORT || 4321);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const notFound = new Response('Not found', { status: 404 });

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname).split('?')[0].split('#')[0] || '/';
    const normalized = path.normalize(pathname) === '/' ? '/index.html' : path.normalize(pathname);
    // Anchor under root and reject any traversal outside it.
    const abs = path.resolve(root, '.' + normalized);
    if (abs !== root && !abs.startsWith(root + path.sep)) return notFound;

    let st;
    try {
      st = await stat(abs);
    } catch {
      return notFound;
    }
    if (st.isDirectory()) {
      const idx = path.join(abs, 'index.html');
      try {
        await stat(idx);
      } catch {
        return notFound;
      }
      return new Response(Bun.file(idx), { headers: { 'content-type': MIME['.html'] } });
    }
    const ext = path.extname(abs).toLowerCase();
    return new Response(Bun.file(abs), {
      headers: { 'content-type': MIME[ext] || 'application/octet-stream' },
    });
  },
});

console.log(`Serving ${root} at http://localhost:${server.port}`);
