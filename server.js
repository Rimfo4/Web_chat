const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = 'localhost';
const PORT = Number(process.env.PORT) || 3000;
const ROOT = path.resolve(__dirname);
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function sendError(res, code, message) {
  res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(message);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendError(res, 405, 'Method Not Allowed');
  }
  let requestPath;
  try {
    requestPath = decodeURIComponent(
      new URL(req.url, `http://${req.headers.host || HOST}`).pathname,
    );
  } catch {
    return sendError(res, 400, 'Bad Request');
  }

  if (requestPath === '/')
    requestPath = fs.existsSync(path.join(ROOT, 'index.html'))
      ? '/index.html'
      : '/tresh/chat.html';

  const filePath = path.resolve(ROOT, `.${requestPath}`);

  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`))
    return sendError(res, 403, 'Forbidden');

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) return sendError(res, 404, 'Not Found');
    res.writeHead(200, {
      'Content-Type':
        MIME_TYPES[path.extname(filePath).toLowerCase()] ||
        'application/octet-stream',
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache',
    });

    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath)
      .on('error', () => res.destroy())
      .pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Static server running at http://${HOST}:${PORT}`);
  console.log(`Serving files from ${ROOT}`);
});
