import http from 'http';
import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import App from './app';

const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const DIST_DIR = path.resolve("dist");

server.listen(port, () => console.log('listening on *:3000'));

app.get('/', (req, res) => res.sendFile(path.join(DIST_DIR, "index.html")));
app.use(express.static(DIST_DIR));

new App(io);

