import express, {Request, Response} from "express";

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.NODE_ENV !== 'production' ? 'localhost' : "directoriomedicodecolombia.co"
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req: Request, res: Response) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
    }
  }).listen(port, (err?: any) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})