"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.NODE_ENV !== 'production' ? 'localhost' : "directoriomedicodecolombia.co";
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;
            if (pathname === '/a') {
                yield app.render(req, res, '/a', query);
            }
            else if (pathname === '/b') {
                yield app.render(req, res, '/b', query);
            }
            else {
                yield handle(req, res, parsedUrl);
            }
        }
        catch (err) {
            console.error('Error occurred handling', req.url, err);
        }
    })).listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
