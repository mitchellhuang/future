const express = require('express');
const next = require('next');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = () => {
  const server = express();
  server.get('*', (req, res) => handle(req, res));
  return server;
}

const server = createServer();

if (!process.env.LAMBDA) {
  app.prepare()
  .then(() => {
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}

exports.app = app;
exports.server = server;
