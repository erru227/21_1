const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

function sendFile(res, filename, contentType) {
  fs.readFile(path.join(__dirname, filename), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/hello') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello World' }));
  } else if (req.url === '/' || req.url === '/index.html') {
    sendFile(res, 'index.html', 'text/html');
  } else if (req.url === '/Style.css') {
    sendFile(res, 'style.css', 'text/css');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
