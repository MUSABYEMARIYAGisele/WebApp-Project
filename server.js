const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const publicDirectory = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Application is running successfully!');
  }

  const requestedFile = req.url === '/' ? 'index.html' : req.url.slice(1);
  const filePath = path.join(publicDirectory, requestedFile);

  if (!filePath.startsWith(publicDirectory)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Page not found');
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = server;
